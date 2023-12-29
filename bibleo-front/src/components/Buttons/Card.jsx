import { CardContent, CardMedia, Paper, Typography } from "@mui/material";
import React from "react";

function CardBook({ book, children }) {
  const { titre = "", description = "", imageUri = "" } = book;
  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <CardMedia sx={{ height: 250 }} image={imageUri} title={titre} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {titre}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {description}
        </Typography>
      </CardContent>
      {children}
    </Paper>
  );
}

export default CardBook;
