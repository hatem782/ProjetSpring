import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

function ModifBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="modification">
        <Tooltip title="Update">
          <EditIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default ModifBtn;
