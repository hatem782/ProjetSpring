import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider, Grid, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { GetOneBook } from "../../../redux/Books.reducer";
import {
  GetAllCommentaireByLivre,
  deleteCommentaire,
} from "../../../redux/Commentaire.reducer";
import { useParams } from "react-router-dom";
import Avatar from "../../../components/Avatar";

import styles from "./styles.module.css";
import { makeDate } from "../../../functions/Dates.functions";
import usePopup from "../../../hooks/usePupup";
import ModalEmprunt from "./ModalEmprunt";
import MakeComment from "./MakeComment";
import UpateComment from "./UpateComment";
import MakeReview from "./MakeReview";
import UserNavbar from "../../../layouts/UserNavbar/UserNavbar";

import StarHalfIcon from "@mui/icons-material/StarHalf";
import ChatIcon from "@mui/icons-material/Chat";
import ClassIcon from "@mui/icons-material/Class";

import DeleteBtn from "../../../components/Buttons/DeleteBtn";
import ModifBtn from "../../../components/Buttons/ModifBtn";
import { GetAllReviewByBook } from "../../../redux/Review.reducer";
import Rates from "../../../components/Rates/Rates";

export default function OneBookDetails() {
  const [open, handle_open, handle_close] = usePopup();
  const [open2, handle_open2, handle_close2] = usePopup();
  const [open3, handle_open3, handle_close3] = usePopup();
  const book = useSelector((state) => state.BookReducers.book);
  const reviews = useSelector((state) => state.ReviewReducers.reviewsByBook);

  const [rates, setRates] = React.useState(0);

  const dispatch = useDispatch();

  const params = useParams();

  React.useEffect(() => {
    dispatch(GetOneBook(params.id));
    dispatch(GetAllCommentaireByLivre(params.id));
    dispatch(GetAllReviewByBook(params.id));
  }, [params, dispatch]);

  React.useEffect(() => {
    if (reviews.length > 0) {
      let sum = 0;
      reviews.forEach((item) => {
        sum += item.rate;
      });

      setRates(sum / reviews.length);
    }
  }, [reviews]);

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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h1>About Book</h1>
                <div>
                  <Rates number={rates} />
                  <h4 style={{ textAlign: "end" }}>
                    Rated By : {reviews.length} persons
                  </h4>
                </div>
              </div>
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

              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => {
                      handle_open2(book);
                    }}
                    startIcon={<ChatIcon />}
                  >
                    Add Comment
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    disabled={book.quantite === 0}
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => {
                      handle_open3(book);
                    }}
                    startIcon={<StarHalfIcon />}
                  >
                    Book Review
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button
                    disabled={book.quantite === 0}
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={<ClassIcon />}
                    onClick={() => {
                      if (book.quantite !== 0) {
                        handle_open(book);
                      } else {
                        alert("This Book is not available");
                      }
                    }}
                  >
                    Emprunt This Book{" "}
                    {book.quantite === 0 && " - (Not Available)"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Commentaires />
        </Box>
      )}

      {open && <ModalEmprunt popup={{ open }} handleClose={handle_close} />}
      {open3 && (
        <MakeReview popup={{ open: open3 }} handleClose={handle_close3} />
      )}
      {open2 && (
        <MakeComment popup={{ open: open2 }} handleClose={handle_close2} />
      )}
    </Box>
  );
}

const Item = ({ title, children }) => (
  <h3>
    {title} : <span> {children} </span>
  </h3>
);

const Commentaires = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.CommentaireReducers.commentairesByLivre
  );

  React.useEffect(() => {
    dispatch(GetOneBook(params.id));
    dispatch(GetAllCommentaireByLivre(params.id));
  }, [params, dispatch]);

  return (
    <div>
      {comments
        .filter((comment) => !comment.estSignale)
        .map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
    </div>
  );
};

const Comment = ({ comment }) => {
  const { objet, contenu, adherent } = comment;
  const dispatch = useDispatch();
  const [open, handle_open, handle_close] = usePopup();
  const currentUser = useSelector((state) => state.UserReducers.user);

  let is_owner = currentUser.id === adherent.id;

  const DeleteMessage = () => {
    dispatch(deleteCommentaire(comment, () => {}));
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        margin: "10px 0px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className={styles.comment}>
        <div className={styles.user}>
          <Avatar name={adherent.fullname} />
          <h4>{adherent.fullname}</h4>
        </div>
        <div className={styles.content}>
          <h3> Object : {objet} </h3>
          <h4> Comment : {contenu} </h4>
        </div>
      </div>

      {is_owner && (
        <div className={styles.icons}>
          <ModifBtn
            onClick={() => {
              handle_open(comment);
            }}
          />
          <DeleteBtn onClick={DeleteMessage} />
        </div>
      )}

      {open && <UpateComment popup={{ open }} handleClose={handle_close} />}
    </Paper>
  );
};
