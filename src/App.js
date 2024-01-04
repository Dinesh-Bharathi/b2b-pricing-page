import React from "react";
import Pricing from "./pricing/Pricing";
import { SnackbarProvider, closeSnackbar } from "notistack";
import Loader from "./components/Loader";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const App = () => {
  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        maxSnack={3}
        autoHideDuration={2000}
        dense
        preventDuplicate
        action={(key) => (
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <Close />
          </IconButton>
        )}
      >
        <Loader />
        <Pricing />
      </SnackbarProvider>
    </div>
  );
};

export default App;
