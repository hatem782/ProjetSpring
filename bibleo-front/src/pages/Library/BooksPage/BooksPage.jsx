import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

import { GetAllBook, GetAllBookWithFilter } from "../../../redux/Books.reducer";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../../layouts/UserNavbar/UserNavbar";
import PaginationComponent from "../../../components/PaginationComponent";
import { GetAllAllAuther, GetAllAuther } from "../../../redux/Auther.reducer";

const genre = [
  "All",
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
  "Finance",
  "Autre",
];

export default function BooksPage() {
  const books = useSelector((state) => state.BookReducers.books);
  const pages = useSelector((state) => state.BookReducers.pagination);
  const authers = useSelector((state) => state.AutherReducers.all_authers);
  const [currentPage, setCurrentPage] = React.useState(0); // Track current page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Form, setForm] = React.useState({
    titre: "All",
    genre: "All",
    auteur: -1,
  });

  React.useEffect(() => {
    dispatch(
      GetAllBookWithFilter({
        page: currentPage,
        titre: Form.titre,
        auteur: Form.auteur,
        genre: Form.genre,
      })
    );
  }, [currentPage]);

  React.useEffect(() => {
    dispatch(GetAllAllAuther());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const GoToOneBook = (book) => {
    navigate(`/library/book/${book.id}`);
  };

  const Search = () => {
    setCurrentPage(0);
    dispatch(
      GetAllBookWithFilter({
        page: 0,
        titre: Form.titre,
        auteur: Form.auteur,
        genre: Form.genre,
      })
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserNavbar />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={3} sm={3} md={3} lg={3}>
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
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <TextField
              fullWidth
              label="Book Genre"
              required
              name="genre"
              select
              variant="outlined"
              onChange={handleChange}
              value={Form.genre}
            >
              {genre.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <TextField
              fullWidth
              label="Auther"
              required
              name="auteur"
              variant="outlined"
              onChange={handleChange}
              value={Form.auteur}
              select
            >
              <MenuItem value={-1}>All</MenuItem>
              {authers.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nom} {item.prenom}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Button fullWidth variant="outlined" size="large">
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={Search}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {books.map((book, key) => {
            return (
              <Grid
                key={key}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                onClick={() => {
                  GoToOneBook(book);
                }}
              >
                <Paper>
                  <div className={styles.book}>
                    <img src={book.imageUri} alt={book.titre} />
                    <h3>{book.titre}</h3>
                    <Divider />
                    <h3>Genre : {book?.genre || ""}</h3>
                    <Divider />
                    <div className={styles.details}>
                      <h3>Auther : {book?.auteur?.nom || ""}</h3>
                      <h3>Quantity : {book?.quantite || 0}</h3>
                    </div>
                  </div>
                </Paper>
              </Grid>
            );
          })}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {pages && (
              <PaginationComponent
                totalPages={pages?.totalPages || 1}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
