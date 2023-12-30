import React from "react";

import IconButton from "@mui/material/IconButton";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { Tooltip } from "@mui/material";

function PayerBtn(props) {
  const { onClick } = props;
  return (
    <div>
      <IconButton color="primary" onClick={onClick} aria-label="accept">
        <Tooltip title="Payement Done">
          <PriceCheckIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default PayerBtn;
