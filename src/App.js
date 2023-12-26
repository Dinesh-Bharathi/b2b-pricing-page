import React from "react";
import Pricing from "./pricing/Pricing";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        maxSnack={3}
      >
        <Pricing />
      </SnackbarProvider>
    </div>
  );
};

export default App;
