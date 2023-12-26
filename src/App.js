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
      >
        <Loader />
        <Pricing />
      </SnackbarProvider>
    </div>
  );
};

export default App;
