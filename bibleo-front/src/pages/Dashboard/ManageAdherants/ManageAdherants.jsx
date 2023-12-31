import React, { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import ModifBtn from "../../../components/Buttons/ModifBtn";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";

import { useDispatch, useSelector } from "react-redux";
import { GetAllAdherant } from "../../../redux/Adherant.reducer";
import { makeDate } from "../../../functions/Dates.functions";

import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import usePopup from "../../../hooks/usePupup";

function ManageAdherants() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.AdherantReducers.adherants);

  const [popup_add, open_add, close_add] = usePopup();
  const [popup_modif, open_modif, close_modif] = usePopup();
  const [popup_delete, open_delete, close_delete] = usePopup();

  useEffect(() => {
    dispatch(GetAllAdherant());
  }, []);
  return (
    <Paper sx={{ p: 2 }}>
      <h2>
        Manage Adhérants{" "}
        <Button onClick={open_add} variant="outlined" endIcon={<AddIcon />}>
          Add Adherant
        </Button>
      </h2>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>AbonnementExpireDate</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.fullname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{makeDate(row.birthday)}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{makeDate(row.abonnementExpireDate)}</TableCell>
              <TableCell>
                <Stack justifyContent="center" direction="row">
                  {/* <ShowBtn onClick={() => {}} /> */}
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

export default ManageAdherants;
