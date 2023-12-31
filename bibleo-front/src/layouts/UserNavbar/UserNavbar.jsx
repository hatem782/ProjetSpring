import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

  const GoToLibrary = () => {
    navigate("/library/books");
  };

  const GoToMyEmprunts = () => {
    navigate("/library/my-emprunts");
  };

  const GoToLogout = () => {
    navigate("/logout");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          onClick={GoToLibrary}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
        >
          Library
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Button onClick={GoToMyEmprunts} color="inherit">
          My Emprunts
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={GoToLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavbar;
