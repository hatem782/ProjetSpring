import React, { useState, useEffect } from "react";
import PaginationComponent from "../../../components/PaginationComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";

import ShowBtn from "../../../components/Buttons/ShowBtn";
import ModifBtn from "../../../components/Buttons/ModifBtn";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";

import { useDispatch, useSelector } from "react-redux";
import { GetAllBook } from "../../../redux/Books.reducer";
import { makeDate } from "../../../functions/Dates.functions";

import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import ModalShow from "./ModalShow";
import usePopup from "../../../hooks/usePupup";

function ManageBooks() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.BookReducers.books);

  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const itemsPerPage = 5; // Number of items per page

  const [popup_add, open_add, close_add] = usePopup();
  const [popup_modif, open_modif, close_modif] = usePopup();
  const [popup_delete, open_delete, close_delete] = usePopup();
  const [popup_show, open_show, close_show] = usePopup();

  useEffect(() => {
    dispatch(GetAllBook());
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Paper sx={{ p: 2 }}>
          <h2>
            Manage Books{" "}
            <Button onClick={open_add} variant="outlined" endIcon={<AddIcon />}>
              Add Book
            </Button>
          </h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Annee Pub</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Langue</TableCell>
                <TableCell align="center">action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.titre}</TableCell>
                  <TableCell>{makeDate(row.anneePub)}</TableCell>
                  <TableCell>{row.isbn}</TableCell>
                  <TableCell>{row.quantite}</TableCell>
                  <TableCell>{row.genre}</TableCell>
                  <TableCell>{row.langue}</TableCell>

                  <TableCell>
                    <Stack justifyContent="center" direction="row">
                      <ShowBtn
                        onClick={() => {
                          open_show(row);
                        }}
                      />
                      <ModifBtn
                        onClick={() => {
                          open_modif(row);
                        }}
                      />
                      <DeleteBtn
                        onClick={() => {
                          open_delete(row);
                        }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent
            totalPages={Math.ceil(data.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          {popup_add && (
            <ModalAdd popup={{ open: popup_add }} handleClose={close_add} />
          )}

          {popup_modif && (
            <ModalUpdate
              popup={{ open: popup_modif }}
              handleClose={close_modif}
            />
          )}

          {popup_delete && (
            <ModalDelete
              popup={{ open: popup_delete }}
              handleClose={close_delete}
            />
          )}

          {popup_show && (
            <ModalShow popup={{ open: popup_show }} handleClose={close_show} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ManageBooks;
