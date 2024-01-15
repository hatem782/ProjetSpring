import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CreateCommentaire } from "../../../redux/Commentaire.reducer";

function MakeComment({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const adherant = useSelector((state) => state.UserReducers.user);
  const book = useSelector((state) => state.BookReducers.book);

  const [Form, setForm] = useState({
    objet: "",
    contenu: "",
  });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const callback = () => {
    handleClose();
  };

  const handleSubmit = () => {
    let new_comment = {
      ...Form,
      livre: { id: book.id },
      adherent: { id: adherant.id },
    };
    dispatch(CreateCommentaire(new_comment, callback));
  };

  return (
    <Dialog open={open} handleClose={handleClose} title={"Make Comment"}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="text"
              label="Object"
              name="objet"
              variant="outlined"
              required
              onChange={handleChange}
              value={Form.objet}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              type="text"
              label="Content"
              name="contenu"
              variant="outlined"
              multiline
              rows={4}
              required
              onChange={handleChange}
              value={Form.contenu}
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
          Add Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MakeComment;
