import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

function ModifBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="modification">
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default ModifBtn;
