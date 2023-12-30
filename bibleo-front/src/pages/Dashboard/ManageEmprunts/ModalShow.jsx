import React from "react";
import { Divider, Grid } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { makeDate } from "../../../functions/Dates.functions";
import Chip from "../../../components/Chip/Chip";

const MakeChipStatus = ({ row }) => {
  // pending
  if (row.statut === "EnAttente")
    return <Chip label="En Attente" color="warning" />;

  // refused
  if (row.statut === "Refusé") return <Chip label="Refused" color="error" />;

  // accepted
  if (row.statut === "Emprunté")
    return <Chip label="Emprunted" color="success" />;

  // done
  if (row.statut === "Retourné") return <Chip label="Done" color="info" />;

  // returned retard
  if (row.statut === "Retard" && row.amende === 0)
    return <Chip label="Retard" color="secondary" />;

  if (row.statut === "Retard" && row.amende !== 0)
    return <Chip label="Retard & Amande" color="error" />;

  return <Chip label="Retard " color="error" />;
};

function ModalDelete({ popup, handleClose }) {
  const { open: emprunt } = popup;

  return (
    <Dialog
      open={emprunt !== null}
      handleClose={handleClose}
      title={"Show Detail Emprunt"}
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
            <img
              src={emprunt.livre.imageUri}
              alt=""
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <h3>About Emprunt</h3>
            <Item title="Start-End Date">
              {makeDate(emprunt.dateDebut)} - {makeDate(emprunt.dateDebut)}
            </Item>
            <Divider />
            <Item title="Return Date">
              {emprunt.dateDebut ? makeDate(emprunt.dateDebut) : "Not Yet"}
            </Item>
            <Divider />
            <Item title="Number Of Copies Emprunted">
              {emprunt.nbCopie} - copie {emprunt.nbCopie > 1 ? "s" : ""}
            </Item>

            <Divider />
            <Item title="Amande Value : ">{emprunt.amende}.00DT</Item>

            <Divider />
            <Item title="Emprunt Status">
              {" "}
              <MakeChipStatus row={emprunt} />
            </Item>
            <Divider />
            <h3>About Adherant</h3>
            <Item title="Adherant FullName"> {emprunt.adherent.fullname} </Item>
            <Divider />
            <Item title="Adherant Email"> {emprunt.adherent.email} </Item>
            <Divider />
            <Item title="Adherant Phone Number">
              +216 {emprunt.adherent.phone}
            </Item>
            <Divider />

            <h3>About Book</h3>
            <Item title="Book Title"> {emprunt.livre.titre} </Item>
            <Divider />
            <Item title="ID / ISBN ">
              {emprunt.livre.id} / {emprunt.livre.isbn}
            </Item>
            <Divider />
            <Item title="Quantity / Amandes Par Jour">
              {emprunt.livre.quantite} / {emprunt.livre.amendeParJour}DT
            </Item>
            <Divider />
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
