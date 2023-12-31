import React from "react";

import IconButton from "@mui/material/IconButton";
import ReportIcon from "@mui/icons-material/Report";

function SignalBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="delete">
        <ReportIcon />
      </IconButton>
    </div>
  );
}

export default SignalBtn;
