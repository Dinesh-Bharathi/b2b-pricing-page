/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

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
    h4: {
      fontSize: "18px",
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#42a5f5",
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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
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
            // gap: 4px;
            color: "#000",
            border: "1px solid #727272",
            padding: "4px 20px",
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
  },
});

export default theme;
