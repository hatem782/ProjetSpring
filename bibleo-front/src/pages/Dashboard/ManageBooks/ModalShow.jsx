import React from "react";
import { Divider, Grid } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { makeDate } from "../../../functions/Dates.functions";

function ModalDelete({ popup, handleClose }) {
  const { open: book } = popup;

  return (
    <Dialog
      open={book !== null}
      handleClose={handleClose}
      title={"Show Detail Book"}
      width="md"
    >
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={book.imageUri} alt="" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Item title="Book Title"> {book.titre} </Item>
            <Divider />
            <Item title="ID / ISBN ">
              {book.id} / {book.isbn}
            </Item>
            <Divider />
            <Item title="Quantity / Amandes Par Jour">
              {book.quantite} / {book.amendeParJour}DT
            </Item>
            <Divider />
            <Item title="Genre / Langue">
              {book.genre} / {book.langue}
            </Item>
            <Divider />
            <Item title="Year of publish">{makeDate(book.anneePub)}</Item>
            <Divider />
            <Item title="Description">{book.description}</Item>

            <h3>About Auther</h3>

            <Item title="ID">{book.auteur.id}</Item>
            <Item title="Full Name">
              {book.auteur.nom} {book.auteur.prenom}
            </Item>
            <Item title="Birth Date">{makeDate(book.auteur.dateNaiss)}</Item>
            <Item title="Nationality">{book.auteur.nationalite}</Item>
            <Item title="Status">{book.auteur.auteurStatut}</Item>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Item = ({ title, children }) => (
  <h4>
    {title} : <span> {children} </span>
  </h4>
);

export default ModalDelete;
