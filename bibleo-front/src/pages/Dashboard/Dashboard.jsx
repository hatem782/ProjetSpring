import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from "../../layouts/Navbar/Navbar";
import SideBar from "../../layouts/SideBar/SideBar";
import BodyPage from "../../layouts/BodyPage/BodyPage";
import { Route, Routes } from "react-router-dom";

import { AdminRoutes } from "../../routes/Routes";

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar open={open} toggleDrawer={toggleDrawer} />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <BodyPage>
          <Routes>
            {[
              ...AdminRoutes.main,
              ...AdminRoutes.sub,
              ...AdminRoutes.hidden,
            ].map((route, index) => (
              <Route key={index} path={route.path} element={<route.Comp />} />
            ))}
            {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </BodyPage>
      </Box>
    </ThemeProvider>
  );
}
