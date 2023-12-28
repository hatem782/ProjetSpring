import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import { makeDate2 } from "../../../functions/Dates.functions";
import { useDispatch } from "react-redux";
import { UpdateAdherant } from "../../../redux/Adherant.reducer";

function ModalUpdate({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const [Form, setForm] = useState({
    fullname: "",
    email: "",
    birthday: new Date(),
    phone: "",
    address: "",
    abonnementExpireDate: new Date(),
    password: "",
  });

  useEffect(() => {
    setForm({
      ...open,
      birthday: makeDate2(open.birthday),
      abonnementExpireDate: makeDate2(open.abonnementExpireDate),
    });
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    dispatch(UpdateAdherant(Form, handleClose));
  };
  return (
    <Dialog
      open={open !== null}
      handleClose={handleClose}
      title={"Modifier Adhérant"}
    >
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Adhérant Full Name"
              required
              name="fullname"
              variant="outlined"
              onChange={handleChange}
              value={Form.fullname}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Adhérant Email"
              required
              name="email"
              variant="outlined"
              onChange={handleChange}
              value={Form.email}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              name="birthday"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.birthday}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Numéro de Téléphone"
              name="phone"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.phone}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.address}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="Abonnement Expire Date"
              name="abonnementExpireDate"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.abonnementExpireDate}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.password}
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
