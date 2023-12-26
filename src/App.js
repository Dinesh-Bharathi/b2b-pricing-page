import React from "react";
import Pricing from "./pricing/Pricing";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

const App = () => {
  const isloading = useSelector((state) => state.procedures.loader);
  console.log("isloading", isloading);
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
