import React, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CreateReview, UpdateMyReview } from "../../../redux/Review.reducer";
import Rates from "../../../components/Rates/Rates";

const stars = [
  "0 : Zero Stars",
  "1 : One Star",
  "2 : Two Stars",
  "3 : Three Stars",
  "4 : Four Stars",
  "5 : Five Stars",
];

function MakeReview({ popup, handleClose }) {
  const { open } = popup;
  const dispatch = useDispatch();

  const adherant = useSelector((state) => state.UserReducers.user);
  const book = useSelector((state) => state.BookReducers.book);
  const reviews = useSelector((state) => state.ReviewReducers.reviewsByBook);
  const [reviewId, setReviewId] = useState(-1);

  const [Form, setForm] = useState({
    Rate: "0 : Zero Stars",
  });
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const callback = () => {
    handleClose();
  };

  const handleSubmit = () => {
    const rate = Number(Form.Rate.split(":")[0]);
    let newRate = {
      rate,
      livre: { id: book.id },
      adherent: { id: adherant.id },
    };
    if (reviewId === -1) {
      dispatch(CreateReview(newRate, callback));
    } else {
      dispatch(UpdateMyReview({ id: reviewId, rate }, callback));
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const review = reviews.find((item) => item.adherent.id === adherant.id);
      if (review) {
        setReviewId(review.id);
        setForm({ Rate: stars[Number(review.rate)] });
      } else {
        setReviewId(-1);
      }
    } else {
      setReviewId(-1);
    }
  }, [reviews]);

  return (
    <Dialog open={open} handleClose={handleClose} title={"Make Review"}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Rates number={Number(Form.Rate.split(":")[0])} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="Rate"
              variant="outlined"
              onChange={handleChange}
              value={Form.Rate}
              label="Rating"
              select
              required
            >
              {stars.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
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
          Make Review
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MakeReview;
