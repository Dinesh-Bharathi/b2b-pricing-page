import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProcedure,
  fetchProcedures,
} from "../assets/Data/procedure/procedureSlice";
import {
  Grid,
  IconButton,
  Skeleton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { CurrencyRupee, Delete, EditNote } from "@mui/icons-material";
import ConfirmationModal from "../components/ConfirmationModal";
import { enqueueSnackbar } from "notistack";
import { openModal } from "../components/modalSlice";
import AddProcedureModal from "../components/AddProcedureModal";

const SkeletonColumns = [
  {
    field: "type",
    headerName: "Type",
    minWidth: 340,
    renderCell: (params) => <Skeleton width="100%" height="40px" />,
  },
  {
    field: "percentage",
    headerName: "Percentage (%)",
    minWidth: 220,
    renderCell: (params) => <Skeleton width="100%" height="40px" />,
  },
  {
    field: "notes",
    headerName: "Notes",
    minWidth: 240,
    renderCell: (params) => <Skeleton width="100%" height="40px" />,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 180,
    renderCell: (params) => <Skeleton width="100%" height="40px" />,
  },
];

const SkeletonRows = Array.from({ length: 10 }, (item, idx) => ({
  id: idx,
  type: "",
  percentage: "",
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
  console.log("DataGridprocedures", procedures);

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
      // dispatch(fetchProcedures());
      setSelectedProcedure(null);
      enqueueSnackbar("Patient deleted successfully!", {
        variant: "success",
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmationModalOpen(false);
    setSelectedProcedure(null);
  };

  const handleEdit = (id) => {
    const procedureToEdit = procedures.find((procedure) => procedure.id === id);
    setSelectedProcedure(procedureToEdit);
    dispatch(openModal(procedureToEdit));
  };

  const handleSelectionChange = (selectionModel) => {
    // Log the selected row values
    if (selectionModel.length > 0) {
      const selectedRows = selectionModel.map((selectedId) =>
        procedures.find((row) => row.id === selectedId)
      );
      console.log("Selected Rows:", selectedRows);
    }
  };

  const columns = [
    {
      field: "procedureName",
      headerName: "Procedure",
      width: 340,
      label: "Procedure",
    },
    { field: "note", headerName: "Note", width: 300, label: "Note" },
    {
      field: "totalAmount",
      headerName: "Price incl taxes(INR)",
      width: 240,
      label: "Total Amount",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <CurrencyRupee sx={{ fontSize: "14px", mr: 0.5 }} /> {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      label: "Actions",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            className="datagrid-icon"
            aria-label=""
            onClick={() => {
              handleEdit(params.row.id);
            }}
          >
            <EditNote fontSize="small" />
          </IconButton>
          <IconButton
            className="datagrid-icon delete-icon"
            aria-label=""
            sx={{ ml: 2 }}
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} mt={10}>
        <div style={{ height: 500, width: "100%", padding: "0 1em" }}>
          {status === "loading" && (
            <DataGrid
              rows={SkeletonRows}
              columns={SkeletonColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowClassName={getRowClassName}
            />
          )}

          {status === "failed" && (
            <div style={{ textAlign: "center" }}>
              <div>
                <Typography variant="h6" color="text.primary">
                  Error Fetching Data
                </Typography>
              </div>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?w=900&t=st=1703575596~exp=1703576196~hmac=0634a9ad01310ae45a37246849389ca973576c263a9f9a27979a1448e9aebe50"
                alt="nodata"
                style={{ width: "500px" }}
              />
            </div>
          )}
          {status === "succeeded" &&
            (procedures.length ? (
              <DataGrid
                rows={procedures}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                getRowClassName={getRowClassName}
                onSelectionModelChange={handleSelectionChange}
                autoPageSize
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <div>
                  <Typography variant="h6" color="text.primary">
                    No procedures found
                  </Typography>
                  <Button onClick={() => dispatch(openModal())}>
                    Add Procedure
                  </Button>
                </div>
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?w=900&t=st=1703575596~exp=1703576196~hmac=0634a9ad01310ae45a37246849389ca973576c263a9f9a27979a1448e9aebe50"
                  alt="nodata"
                  style={{ width: "500px" }}
                />
              </div>
            ))}
        </div>
      </Grid>
      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <AddProcedureModal
        initialValues={selectedProcedure}
        setInitialValues={setSelectedProcedure}
      />
    </Grid>
  );
};

export default PricingDataGrid;
