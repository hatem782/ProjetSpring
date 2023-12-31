import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { UpdateCommentaire } from "../../../redux/Commentaire.reducer";

function ModalUpdate({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const [Form, setForm] = useState({
    raisonSign: "",
  });

  useEffect(() => {
    setForm({ ...open });
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(UpdateCommentaire(Form, handleClose));
  };
  return (
    <Dialog
      open={open !== null}
      handleClose={handleClose}
      title={"Modifier Raison de signaler"}
    >
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Raison de signaler"
              required
              name="raisonSign"
              variant="outlined"
              onChange={handleChange}
              value={Form.raisonSign}
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalUpdate;
