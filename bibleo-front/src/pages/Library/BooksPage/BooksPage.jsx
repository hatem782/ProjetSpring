import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

import { GetAllBook } from "../../../redux/Books.reducer";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../../layouts/UserNavbar/UserNavbar";
import PaginationComponent from "../../../components/PaginationComponent";

export default function BooksPage() {
  const books = useSelector((state) => state.BookReducers.books);
  const pages = useSelector((state) => state.BookReducers.pagination);
  const [currentPage, setCurrentPage] = React.useState(0); // Track current page
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(GetAllBook(currentPage));
  }, [currentPage]);

  const GoToOneBook = (book) => {
    navigate(`/library/book/${book.id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserNavbar />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
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
