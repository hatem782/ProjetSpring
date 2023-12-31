import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { makeDate2 } from "../../../functions/Dates.functions";
import { useDispatch } from "react-redux";
import { UpdateAuther } from "../../../redux/Auther.reducer";

const Status = ["Décès", "Vivant"];

function ModalUpdate({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const [Form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaiss: new Date(),
    nationalite: "",
    auteurStatut: Status[0],
  });

  useEffect(() => {
    setForm({ ...open, dateNaiss: makeDate2(open.dateNaiss) });
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(UpdateAuther(Form, handleClose));
  };
  return (
    <Dialog
      open={open !== null}
      handleClose={handleClose}
      title={"Modifier Auther"}
    >
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
          onClick={handleSubmit}
          autoFocus
          variant="contained"
          type="submit"
          data-test="buttonUpdateForm"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalUpdate;
