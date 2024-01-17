import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationComponent from "../../../components/PaginationComponent";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import ModifBtn from "../../../components/Buttons/ModifBtn";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";

import { useDispatch, useSelector } from "react-redux";
import { GetAllAuther } from "../../../redux/Auther.reducer";
import { makeDate } from "../../../functions/Dates.functions";

import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import usePopup from "../../../hooks/usePupup";

function ManageAuthers() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AutherReducers.authers);
  const pages = useSelector((state) => state.AutherReducers.pagination);

  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const itemsPerPage = 9; // Number of items per page

  const [popup_add, open_add, close_add] = usePopup();
  const [popup_modif, open_modif, close_modif] = usePopup();
  const [popup_delete, open_delete, close_delete] = usePopup();

  useEffect(() => {
    dispatch(GetAllAuther(currentPage));
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Paper sx={{ p: 2 }}>
      <h2>
        Manage Authers{" "}
        <Button onClick={open_add} variant="outlined" endIcon={<AddIcon />}>
          Add Auther
        </Button>
      </h2>
      <Table size="medium" data-test="table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {row.nom} {row.prenom}
              </TableCell>
              <TableCell>{makeDate(row.dateNaiss)}</TableCell>
              <TableCell>{row.nationalite}</TableCell>
              <TableCell>{row.auteurStatut}</TableCell>

              <TableCell>
                <Stack justifyContent="center" direction="row">
                  {/* <ShowBtn onClick={() => {}} /> */}
                  <ModifBtn
                    onClick={() => {
                      open_modif(row);
                    }}
                    data-test="buttonUpdate"
                  />
                  <DeleteBtn
                    onClick={() => {
                      open_delete(row);
                    }}
                    data-test="buttonDelete"
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pages && (
        <PaginationComponent
          totalPages={pages?.totalPages || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {popup_add && (
        <ModalAdd popup={{ open: popup_add }} handleClose={close_add} />
      )}

      {popup_modif && (
        <ModalUpdate popup={{ open: popup_modif }} handleClose={close_modif} />
      )}

      {popup_delete && (
        <ModalDelete
          popup={{ open: popup_delete }}
          handleClose={close_delete}
        />
      )}
    </Paper>
  );
}

export default ManageAuthers;
