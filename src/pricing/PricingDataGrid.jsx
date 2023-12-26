import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProcedure,
  fetchProcedures,
} from "../assets/Data/procedure/procedureSlice";
import { Grid, IconButton, Skeleton } from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";
import ConfirmationModal from "../components/ConfirmationModal";
import { enqueueSnackbar } from "notistack";

const skeletonColumns = [
  {
    width: 540,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={40} animation="wave" />
    ),
  },
  {
    width: 420,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={40} animation="wave" />
    ),
  },
  {
    width: 340,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={40} animation="wave" />
    ),
  },
  {
    width: 250,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={40} animation="wave" />
    ),
  },
];

// Dummy data for skeleton loader
const skeletonRows = Array.from({ length: 8 }, (_, index) => ({
  id: `${index}`,
  procedureName: "",
  note: "",
  totalAmount: "",
  actions: "",
}));

// Define getRowClassName function
const getRowClassName = (params) => {
  return params.row.id % 2 === 0 ? "odd-row" : "even-row";
};

const PricingDataGrid = () => {
  const dispatch = useDispatch();
  const procedures = useSelector((state) => state.procedures.procedures);
  const status = useSelector((state) => state.procedures.status);

  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    // Fetch procedures when the component mounts
    if (status === "idle") {
      dispatch(fetchProcedures());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    const procedureToDelete = procedures.find(
      (procedure) => procedure.id === id
    );
    setSelectedProcedure(procedureToDelete);
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProcedure) {
      dispatch(deleteProcedure(selectedProcedure.id));
      setConfirmationModalOpen(false);
      dispatch(fetchProcedures());
      enqueueSnackbar("Patient deleted successfully!", {
        variant: "error",
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
  };

  console.log("procedures", procedures);
  const columns = [
    { field: "procedureName", headerName: "Procedure", width: 340 },
    { field: "note", headerName: "Note", width: 320 },
    {
      field: "totalAmount",
      headerName: "Price incl taxes(INR)",
      width: 240,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          ₹ {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton className="datagrid-icon" aria-label="">
            <EditNote fontSize="small" />
          </IconButton>
          <IconButton
            className="datagrid-icon"
            aria-label=""
            sx={{ ml: 2 }}
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} mt={10}>
        <div style={{ height: 500, width: "100%", padding: "0 1em" }}>
          {status === "loading" && (
            <DataGrid
              rows={skeletonRows}
              columns={skeletonColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowClassName={getRowClassName}
            />
          )}
          {status === "failed" && <p>Error fetching data</p>}
          {status === "succeeded" && (
            <DataGrid
              rows={procedures}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableSelectionOnClick
              getRowClassName={getRowClassName}
            />
          )}
        </div>
      </Grid>
      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default PricingDataGrid;
