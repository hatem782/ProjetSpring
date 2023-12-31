import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { signalCommentaire } from "../../../redux/Commentaire.reducer";
function ModalSignal({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();
  const [raisonSign, setRaisonSign] = useState(""); // New state for the reason to signal

  const handleSubmit = (e) => {
    dispatch(signalCommentaire(open, raisonSign, handleClose));
  };

  const handleRaisonChange = (e) => {
    setRaisonSign(e.target.value);
  };

  return (
    <Dialog
      open={open !== null}
      handleClose={handleClose}
      title={"Signal Commentaire"}
    >
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <h2 style={{ color: "#F22C3D" }}>
              Are you sure to signal the comment for : "{open.nom} {open.prenom}
              "?
            </h2>
            <TextField
              fullWidth
              label="Raison de signaler"
              required
              variant="outlined"
              onChange={handleRaisonChange}
              value={raisonSign}
            />
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
          data-test="buttonAddForm"
        >
          Signal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalSignal;
