import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider, Grid, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { GetOneBook } from "../../../redux/Books.reducer";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import { makeDate } from "../../../functions/Dates.functions";
import usePopup from "../../../hooks/usePupup";
import ModalEmprunt from "./ModalEmprunt";
import UserNavbar from "../../../layouts/UserNavbar/UserNavbar";

export default function OneBookDetails() {
  const [open, handle_open, handle_close] = usePopup();
  const book = useSelector((state) => state.BookReducers.book);
  const dispatch = useDispatch();

  const params = useParams();

  React.useEffect(() => {
    dispatch(GetOneBook(params.id));
  }, [params, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserNavbar />

      {!book && <h3>Chargement...</h3>}

      {book && (
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={5}>
              <img
                src={book.imageUri}
                className={styles.main_img}
                alt={book.titre}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={7}>
              <h1>About Book</h1>
              <Item title="Book Title"> {book.titre} </Item>
              <Divider />
              <Item title="ID / ISBN ">
                {book.id} / {book.isbn}
              </Item>
              <Divider />
              <Item title="Amandes Par Jour ">{book.amendeParJour}DT</Item>
              <Divider />
              <Item title="Quantity ">{book.quantite}</Item>
              <Divider />
              <Item title="Genre / Langue">
                {book.genre} / {book.langue}
              </Item>
              <Divider />
              <Item title="Year of publish">{makeDate(book.anneePub)}</Item>
              <Divider />
              <Item title="Description">{book.description}</Item>

              <h1>About Auther</h1>

              <Item title="Full Name">
                {book.auteur.nom} {book.auteur.prenom}
              </Item>
              <Item title="Birth Date">{makeDate(book.auteur.dateNaiss)}</Item>
              <Item title="Nationality">{book.auteur.nationalite}</Item>
              <Item title="Status">{book.auteur.auteurStatut}</Item>

              <Button
                disabled={book.quantite === 0}
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                  if (book.quantite !== 0) {
                    handle_open(book);
                  } else {
                    alert("This Book is not available");
                  }
                }}
              >
                Emprunt This Book {book.quantite === 0 && " - (Not Available)"}
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={12}>
              <MakeComment />
            </Grid>
          </Grid>
        </Box>
      )}

      {open && <ModalEmprunt popup={{ open }} handleClose={handle_close} />}
    </Box>
  );
}

const Item = ({ title, children }) => (
  <h3>
    {title} : <span> {children} </span>
  </h3>
);

const MakeComment = () => {
  const [Form, setForm] = React.useState({ description: "", object: "" });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {};

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 2 }}>
        <h3>Make Comment</h3>

        <TextField
          fullWidth
          label="Object"
          required
          name="object"
          variant="outlined"
          onChange={handleChange}
          rows={4}
          multiline
          value={Form.object}
        />

        <TextField
          fullWidth
          label="Content"
          required
          name="content"
          variant="outlined"
          onChange={handleChange}
          rows={4}
          multiline
          value={Form.content}
        />

        <Button variant="contained" fullWidth>
          Send Comment
        </Button>
      </Paper>
    </Box>
  );
};
