import React from "react";

import IconButton from "@mui/material/IconButton";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Tooltip } from "@mui/material";

function DoneBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="accept">
        <Tooltip title="Finish">
          <TaskAltIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default DoneBtn;
