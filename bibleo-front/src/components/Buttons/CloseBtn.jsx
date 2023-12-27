import React from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "absolute !important",
    right: "10px",
    top: "10px",
  },
}));

function CloseBtn(props) {
  const { onClick } = props;
  const cs = useStyles();
  return (
    <IconButton className={cs.main} onClick={onClick} aria-label="close">
      <CloseIcon />
    </IconButton>
  );
}

export default CloseBtn;
