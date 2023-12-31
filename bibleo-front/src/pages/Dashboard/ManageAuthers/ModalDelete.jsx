import React from "react";
import { Grid } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { deleteAuther } from "../../../redux/Auther.reducer";

function ModalDelete({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(deleteAuther(open, handleClose));
  };
  return (
    <Dialog
      open={open !== null}
      handleClose={handleClose}
      title={"Delete Auther"}
    >
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <h2 style={{ color: "#F22C3D" }}>
              Are you sure to delete the auther : "{open.nom} {open.prenom}"
            </h2>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          autoFocus
          variant="contained"
          type="submit"
          data-test="buttonDeleteForm"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDelete;
