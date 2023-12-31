import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { MakeEmpruntRequest } from "../../../redux/Emprunt.reducer";
import { useNavigate } from "react-router-dom";

function ModalEmprunt({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const adherant = useSelector((state) => state.UserReducers.user);
  const book = useSelector((state) => state.BookReducers.book);
  const navigate = useNavigate();

  const [Form, setForm] = useState({
    dateDebut: new Date(),
    dateFin: new Date(),
    nbCopie: 1,
  });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const callback = () => {
    navigate("/library/my-emprunts");
    handleClose();
  };

  const handleSubmit = () => {
    dispatch(MakeEmpruntRequest(adherant, book, Form, callback));
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={"Emprunt Book "}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="dateDebut"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.dateDebut}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="dateFin"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.dateFin}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Number of Copys"
              name="nbCopie"
              variant="outlined"
              required
              type="number"
              onChange={handleChange}
              value={Form.nbCopie}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          autoFocus
          variant="contained"
          type="submit"
          data-test="buttonAddForm"
          onClick={handleSubmit}
        >
          Send Emprunt Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEmprunt;
