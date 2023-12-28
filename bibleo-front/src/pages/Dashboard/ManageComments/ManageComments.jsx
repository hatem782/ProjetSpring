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
import SignalBtn from "../../../components/Buttons/SignalBtn";

import { useDispatch, useSelector } from "react-redux";
import { GetAllCommentaire } from "../../../redux/Commentaire.reducer";
import { makeDate } from "../../../functions/Dates.functions";

import ModalSignal from "./ModalSignal";
import ModalUpdate from "./ModalUpdate";

import usePopup from "../../../hooks/usePupup";
function ManageComments() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CommentaireReducers.commentaires);
  const [popup_modif, open_modif, close_modif] = usePopup();
  const [popup_signal, open_signal, close_signal] = usePopup();

  useEffect(() => {
    dispatch(GetAllCommentaire());
  }, []);
  console.log(data);
  return (
    <Paper sx={{ p: 2 }}>
      <h2>Manage Commentaires </h2>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Contenu</TableCell>
            <TableCell>Objet</TableCell>
            <TableCell>Adherant</TableCell>
            <TableCell>Livre</TableCell>
            <TableCell>Signalé?</TableCell>
            <TableCell>Raison</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.contenu}</TableCell>
              <TableCell>{row.objet}</TableCell>
              <TableCell>{row.adherent.fullname}</TableCell>
              <TableCell>{row.livre.titre}</TableCell>
              <TableCell>
                {row.estSignale ? "signalé" : "non signalé"}
              </TableCell>
              <TableCell>{row.raisonSign}</TableCell>

              <TableCell>
                <Stack justifyContent="center" direction="row">
                  {/* <ShowBtn onClick={() => {}} /> */}
                  <ModifBtn
                    onClick={() => {
                      if (row.raisonSign) {
                        open_modif(row);
                      }
                    }}
                  />
                  <SignalBtn
                    onClick={() => {
                      if (!row.raisonSign) {
                        open_signal(row);
                      }
                    }}
                    disabled={row.estSignalé}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {popup_modif && (
        <ModalUpdate popup={{ open: popup_modif }} handleClose={close_modif} />
      )}

      {popup_signal && (
        <ModalSignal
          popup={{ open: popup_signal }}
          handleClose={close_signal}
        />
      )}
    </Paper>
  );
}

export default ManageComments;
