import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CreateAuther, GetAllAuther } from "../../../redux/Auther.reducer";
import { CreateBook } from "../../../redux/Books.reducer";
import ImageUp from "../../../components/Buttons/ImageUp";

const genre = [
  "Science",
  "Math",
  "Physique",
  "Chimie",
  "Informatique",
  "Art",
  "Littérature",
  "Histoire",
  "Géographie",
  "Philosophie",
  "Religion",
  "Sport",
  "Cuisine",
  "Autre",
];
const langue = [
  "Français",
  "Arabe",
  "Anglais",
  "Italien",
  "Espagnol",
  "Russe",
  "Japonais",
  "Turc",
];

function ModalAdd({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();
  const authers = useSelector((state) => state.AutherReducers.authers);

  useEffect(() => {
    dispatch(GetAllAuther());
  }, []);

  const [Form, setForm] = useState({
    titre: "",
    isbn: "",
    anneePub: new Date(),
    amendeParJour: 0,
    imageUri: "",
    description: "",
    quantite: 0,
    genre: "",
    langue: "",
    auteur: 1,
  });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    let real_form = { ...Form };
    real_form.auteur = { id: Form.auteur };
    dispatch(CreateBook(real_form, handleClose));
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={"Ajouter Auther"}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Book Title"
              required
              name="titre"
              variant="outlined"
              onChange={handleChange}
              value={Form.titre}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ISBN"
              required
              name="isbn"
              variant="outlined"
              type="number"
              onChange={handleChange}
              value={Form.isbn}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="date"
              label="Publish Year"
              name="anneePub"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.anneePub}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amande Par Jour"
              name="amendeParJour"
              variant="outlined"
              type="number"
              required
              onChange={handleChange}
              value={Form.amendeParJour}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantite"
              variant="outlined"
              type="number"
              required
              onChange={handleChange}
              value={Form.quantite}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="genre"
              variant="outlined"
              onChange={handleChange}
              value={Form.genre}
              label="Genre"
              select
              required
            >
              {genre.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="langue"
              variant="outlined"
              onChange={handleChange}
              value={Form.langue}
              label="Language"
              select
              required
            >
              {langue.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="auteur"
              variant="outlined"
              onChange={handleChange}
              value={Form.auteur}
              label="Auteur"
              select
              required
            >
              {authers.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nom} {item.prenom}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <ImageUp
              name="imageUri"
              onChange={handleChange}
              value={Form.imageUri}
            >
              Book Image
            </ImageUp>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Description"
              required
              name="description"
              variant="outlined"
              onChange={handleChange}
              rows={4}
              multiline
              value={Form.description}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAdd;
