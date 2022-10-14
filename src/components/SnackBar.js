import React, { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({
  open,
  handleClose,
  vertical,
  horizontal,
  pesan,
  severity,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      message={pesan}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {pesan}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
