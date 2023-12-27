import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { NavLink } from "react-router-dom";
import { AdminRoutes } from "../../routes/Routes";

export const mainListItems = (
  <React.Fragment>
    {AdminRoutes.main.map((route, index) => {
      return (
        <ListItemButton key={index} component={NavLink} to={`${route.path}`}>
          <ListItemIcon>
            <route.icon />
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItemButton>
      );
    })}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {AdminRoutes.sub.map((route, index) => {
      return (
        <ListItemButton key={index} component={NavLink} to={`${route.path}`}>
          <ListItemIcon>
            <route.icon />
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItemButton>
      );
    })}
  </React.Fragment>
);
