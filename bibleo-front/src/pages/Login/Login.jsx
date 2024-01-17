import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import img from "../../assets/images/img.jpeg";
import { useDispatch } from "react-redux";

import { LoginAdherant, LoginAdmin } from "../../redux/User.reducer";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MakeLogin = (login) => {
    dispatch(
      LoginAdherant({
        form: login,
        succ: () => {
          navigate("/library");
        },
        fail: () => {
          dispatch(
            LoginAdmin({
              form: login,
              succ: () => {
                navigate("/dashboard");
              },
              fail: () => {
                alert("email ou mot de passe incorrect");
              },
            })
          );
        },
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const login = {
      email: data.get("email"),
      password: data.get("password"),
    };
    MakeLogin(login);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                defaultValue={"hatem@user.com"}
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue={"ilhem@admin.com"}
              />
              <TextField
                margin="normal"
                defaultValue={"hatem@user.com"}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                defaultValue={"ilhem@admin.com"}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
