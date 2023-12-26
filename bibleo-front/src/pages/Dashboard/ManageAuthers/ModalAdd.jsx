import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { CreateAuther } from "../../../redux/Auther.reducer";

const Status = ["Décès", "Vivant"];

function ModalAdd({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const [Form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaiss: new Date(),
    nationalite: "",
    auteurStatut: Status[0],
  });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(CreateAuther(Form, handleClose));
  };
  return (
    <Dialog open={open} handleClose={handleClose} title={"Ajouter Auther"}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Auther First Name"
              required
              name="nom"
              variant="outlined"
              onChange={handleChange}
              value={Form.nom}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Auther Last Name"
              required
              name="prenom"
              variant="outlined"
              onChange={handleChange}
              value={Form.prenom}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              name="dateNaiss"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.dateNaiss}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationalite"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.nationalite}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="auteurStatut"
              variant="outlined"
              onChange={handleChange}
              value={Form.auteurStatut}
              label="Auther Status"
              select
              required
            >
              {Status.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAdd;
