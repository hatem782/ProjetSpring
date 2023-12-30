import React from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

function DeleteBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="delete">
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default DeleteBtn;
