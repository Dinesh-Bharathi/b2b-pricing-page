import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { AddCircle, Close, Home, QuestionMark } from "@mui/icons-material";
import { Button } from "@mui/material";
import DescriptionDrawer from "../components/DescriptionDrawer";
// import AddProcedureModal, {
//   AlertDialogSlide,
// } from "../components/AddProcedureModal";
import { useDispatch } from "react-redux";
import { openModal } from "../components/modalSlice";
import PricingDataGrid from "./PricingDataGrid";
import AddProcedureModal from "../components/AddProcedureModal";

const drawerWidth = 380;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: "relative",
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openDescription, setOpenDescription] = React.useState(false);

  const handleDrawer = () => {
    setOpenDescription(!openDescription);
  };

  const handleDrawerClose = () => {
    setOpenDescription(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AlertDialogSlide /> */}
      <AddProcedureModal />
      <AppBar position="fixed" open={openDescription}>
        <Toolbar>
          <IconButton className="nav-icon">
            <Home />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Pricing
          </Typography>
          <Button
            className="add-procedure"
            variant="contained"
            disableElevation
            onClick={() => {
              dispatch(openModal());
              // setOpenDescription(false);
            }}
          >
            <AddCircle sx={{ color: "#42a5f5", mr: 1 }} />
            Add procedure
          </Button>
          <IconButton
            className="pricing-description"
            color="inherit"
            aria-label="open drawer"
            edge="end"
            size="small"
            onClick={handleDrawer}
            // sx={{ ...(open && { display: "none" }) }}
          >
            <QuestionMark />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          background: "#FEFBE9",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#FEFBE9",
          },
        }}
        variant="persistent"
        anchor="right"
        open={openDescription}
        onClose={(event, reason) => setOpenDescription(false)}
      >
        <DescriptionDrawer handleClose={handleDrawerClose} />
      </Drawer>
    </Box>
  );
}
