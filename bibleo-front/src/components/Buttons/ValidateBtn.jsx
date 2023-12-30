import React from "react";

import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Tooltip } from "@mui/material";

function ValidateBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="accept">
        <Tooltip title="Accept">
          <DoneAllIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default ValidateBtn;
