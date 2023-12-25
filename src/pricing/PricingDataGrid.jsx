import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProcedures } from "../assets/Data/procedure/procedureSlice";
import { Grid, IconButton, Skeleton } from "@mui/material";
import { Delete, EditNote } from "@mui/icons-material";

const skeletonColumns = [
  {
    width: 540,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={30} animation="wave" />
    ),
  },
  {
    width: 420,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={30} animation="wave" />
    ),
  },
  {
    width: 340,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={30} animation="wave" />
    ),
  },
  {
    width: 250,
    renderCell: (params) => (
      <Skeleton width={"100%"} height={30} animation="wave" />
    ),
  },
];

const PricingDataGrid = () => {
  const dispatch = useDispatch();
  const procedures = useSelector((state) => state.procedures.procedures);
  const status = useSelector((state) => state.procedures.status);

  // Dummy data for skeleton loader
  const skeletonRows = Array.from({ length: 5 }, (_, index) => ({
    id: `${index}`,
    procedureName: "",
    note: "",
    totalAmount: "",
    actions: "",
  }));

  // Define getRowClassName function
  const getRowClassName = (params) => {
    console.log(params.row.id % 2);
    return params.row.id % 2 === 0 ? "odd-row" : "even-row";
  };

  useEffect(() => {
    // Fetch procedures when the component mounts
    if (status === "idle") {
      dispatch(fetchProcedures());
    }
  }, [status, dispatch]);

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
          <IconButton className="datagrid-icon" aria-label="" sx={{ ml: 2 }}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} mt={5}>
        <div style={{ height: 500, width: "100%" }}>
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
    </Grid>
  );
};

export default PricingDataGrid;
