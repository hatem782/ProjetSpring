import React from "react";

import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
function ShowISBtn(props) {
  const { url } = props;
  return (
    <div>
      <IconButton
        color="primary"
        onClick={() => window.open(url, "_blank")}
        aria-label="show in site"
      >
        <LanguageIcon />
      </IconButton>
    </div>
  );
}

export default ShowISBtn;
