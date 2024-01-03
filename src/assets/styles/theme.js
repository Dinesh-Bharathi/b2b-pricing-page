/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { createTheme } from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins,sans-serif",
    h4: {
      fontSize: "18px",
    },
    h6: {
      "&.confirmation-title": {
        fontSize: "14px",
        textAlign: "center",
      },
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2",
          color: "#fff",
          "&.bgMain": {
            backgroundColor: "#1976d2",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.nav-icon": {
            backgroundColor: "#fff",
            color: "#42a5f5",
            marginRight: 10,
          },
          "&.pricing-description": {
            borderRadius: "8px",
            background: "#E5F6FF",
            color: "#42a5f5",
            marginLeft: 15,
          },
          "&.datagrid-icon": {
            color: "#E55C26",
            border: "1px solid #E55C26",
            borderRadius: "50%",
            ":hover": {
              backgroundColor: "#E55C26",
              color: "#fff",
            },
            "&.delete-icon": {
              border: "1px solid #B80000",
              color: "#B80000",
              ":hover": {
                backgroundColor: "#B80000",
                color: "#fff",
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          "&.add-procedure": {
            backgroundColor: "#E5F6FF",
            borderRadius: "50px",
            color: "#535353",
            textTransform: "capitalize",
          },
          "&.modal-action-save": {
            color: "#fff",
            padding: "4px 20px",
            borderRadius: "21px",
            backgroundColor: "#0062DD",
            boxShadow: "none",
          },
          "&.modal-action-cancel": {
            color: "#000",
            border: "1px solid #727272",
            padding: "4px 20px",
            borderRadius: "21px",
            backgroundColor: "#EFEFEF",
            fontSize: "13px",
            boxShadow: "none",
          },
          "&.modal-action-yes": {
            color: "#fff",
            padding: "4px 30px",
            borderRadius: "21px",
            backgroundColor: "#0062DD",
            boxShadow: "none",
            marginLeft: "16px",
          },
          "&.modal-action-no": {
            color: "#000",
            border: "1px solid #727272",
            padding: "4px 30px",
            borderRadius: "21px",
            backgroundColor: "#EFEFEF",
            fontSize: "13px",
            boxShadow: "none",
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px 44px 40px",
          fontSize: "13px",
          fontWeight: "600",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
        },
        columnHeaders: {
          backgroundColor: "#C3EAFF",
        },
        columnHeaderTitle: {
          fontWeight: "600",
        },
        row: {
          "&.odd-row": {
            background: "#C3EAFF50",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

export default theme;
