import React from "react";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

function RefuseBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="accept">
        <Tooltip title="Refuse">
          <CloseIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default RefuseBtn;
