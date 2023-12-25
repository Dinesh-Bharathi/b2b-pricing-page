import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "./Header";
import PricingDataGrid from "./PricingDataGrid";

const Pricing = () => {
  return (
    <Box>
      <Header />
      <PricingDataGrid />
    </Box>
  );
};

export default Pricing;
