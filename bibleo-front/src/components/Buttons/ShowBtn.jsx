import React from "react";

import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "@mui/material";

function ShowBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="show">
        <Tooltip title="Show More">
          <VisibilityIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default ShowBtn;
