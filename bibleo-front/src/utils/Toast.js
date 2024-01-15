import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

function CustomToaster(props) {
  const { toasts } = useToasterStore();
  const { limit = 5 } = props;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= limit)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return <Toaster position="top right" {...props} data-test="toast" />;
}

export default CustomToaster;
