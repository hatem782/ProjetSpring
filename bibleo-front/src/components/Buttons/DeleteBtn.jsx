import React from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default DeleteBtn;
