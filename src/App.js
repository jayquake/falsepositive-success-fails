import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./styles.css";
import {
  Link,
  Container,
  IconButton,
  Typography,
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import Search from "./components/layout/search";
import Clickables from "./components/pages/Criteria/Clickables/Clickables";
import Context from "./components/pages/Criteria/Context/Context";
import Carousels from "./components/pages/Criteria/Carousels/Carousels";
import Forms from "./components/pages/Criteria/Forms/Forms";
import Document from "./components/pages/Criteria/Document/Document";
import Errors from "./components/pages/Criteria/Errors/Errors";
import Graphics from "./components/pages/Criteria/Graphics/Graphics";
import Keyboard from "./components/pages/Criteria/Keyboard/Keyboard";
import Navigation from "./components/pages/Criteria/Navigation/Navigation";
import Readability from "./components/pages/Criteria/Readability/Readability";
import Headings from "./components/pages/Criteria/Headings/Headings";
import Tables from "./components/pages/Criteria/Tables/Tables";
import KeyboardRoutes from "./components/pages/Criteria/Keyboard/KbruleRoutes";
import FormruleRoutes from "./components/pages/Criteria/Forms/rules/FormruleRoutes";
import ClickableruleRoutes from "./components/pages/Criteria/Clickables/rules/ClickableruleRoutes";
import ItemPage from "./components/layout/rulePage";
import ListRoutes from "./routes/routes";
import { fetchItemData } from "./components/util/dataService"; // Import your data fetching function
import FormListRulesWithRoutes from "./components/pages/Criteria/Forms/Forms";
import AllRulesWithRoutes from "./components/pages/Criteria/AllRulesLinks";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()} {new Date().getDay()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

export default function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const currentPath = pathnames[1] || "";

  const [itemData, setItemData] = useState(null);

  const fetchItem = (currentRule) => {
    fetchItemData(currentRule)
      .then((data) => setItemData(data))
      .catch((error) => console.error("Error fetching item data:", error));
  };

  useEffect(() => {
    fetchItem(currentPath);
    return undefined; // Optional safeguard
  }, [currentPath]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar sx={{ paddingRight: 24 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ marginRight: 36, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            ...(open || {
              overflowX: "hidden",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              width: (theme) => theme.spacing(7),
              [theme.breakpoints.up("sm")]: {
                width: (theme) => theme.spacing(9),
              },
            }),
          },
        }}
      >
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...(theme) => theme.mixins.toolbar,
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <main
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div sx={(theme) => theme.mixins.toolbar} />
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
          <Routes>
            <Route index element={<Home navigate={navigate} title="Home" />} />
            <Route path="rules/*" element={<ListRoutes />} />
            <Route
              path="/*"
              element={
                <AllRulesWithRoutes itemData={itemData} navigate={navigate} />
              }
            />
            {/* Add your other routes here */}
          </Routes>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
