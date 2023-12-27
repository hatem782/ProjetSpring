import { useState } from "react";

const usePopup = () => {
  const [open, setOpen] = useState(null);

  const handle_open = (item) => {
    let valid_item = item ? item : true;
    setOpen(valid_item);
  };

  const handle_close = () => {
    setOpen(null);
  };

  return [open, handle_open, handle_close];
};

export default usePopup;
