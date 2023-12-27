import React from "react";

import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ShowBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="show">
        <VisibilityIcon />
      </IconButton>
    </div>
  );
}

export default ShowBtn;
