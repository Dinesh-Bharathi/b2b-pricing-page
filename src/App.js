import React from "react";
import Pricing from "./pricing/Pricing";
import { SnackbarProvider } from "notistack";
import Loader from "./components/Loader";

const App = () => {
  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        maxSnack={3}
        autoHideDuration={1000}
      >
        <Loader />
        <Pricing />
      </SnackbarProvider>
    </div>
  );
};

export default App;
