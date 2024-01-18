import React, { useState, useEffect } from "react";
import PaginationComponent from "../../../components/PaginationComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import { Button, Grid } from "@mui/material";

import ShowBtn from "../../../components/Buttons/ShowBtn";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";

import { useDispatch, useSelector } from "react-redux";
import {
  GetAllEmprunts,
  typesEmprunts,
  SetGetTypes,
  AcceptEmprunts,
  RefuseEmprunt,
  FinishEmprunt,
  PayerAmande,
} from "../../../redux/Emprunt.reducer";
import { makeDate } from "../../../functions/Dates.functions";

import ModalDelete from "./ModalDelete";
import ModalShow from "./ModalShow";
import usePopup from "../../../hooks/usePupup";
import ValidateBtn from "../../../components/Buttons/ValidateBtn";
import RefuseBtn from "../../../components/Buttons/RefuseBtn";
import PayerBtn from "../../../components/Buttons/PayerBtn";
import DoneBtn from "../../../components/Buttons/DoneBtn";
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

function ManageEmprunts() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.EmpruntsReducers.emprunts);
  const pages = useSelector((state) => state.EmpruntsReducers.pagination);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const typeEmprunts = useSelector((state) => state.EmpruntsReducers.get_type);

  const [popup_delete, open_delete, close_delete] = usePopup();
  const [popup_show, open_show, close_show] = usePopup();

  useEffect(() => {
    dispatch(GetAllEmprunts(currentPage));
  }, [typeEmprunts, dispatch, currentPage]);

  const setTypeEmprunts = (type) => {
    dispatch(SetGetTypes(type));
  };

  const handleAccept = (emprunt) => {
    dispatch(AcceptEmprunts(emprunt));
  };

  const handleRefuse = (emprunt) => {
    dispatch(RefuseEmprunt(emprunt));
  };

  const handleFinish = (emprunt) => {
    dispatch(FinishEmprunt(emprunt));
  };

  const PayerAmandeDone = (row) => {
    dispatch(PayerAmande(row));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Paper sx={{ p: 2 }}>
          <h2>Manage Emprunts</h2>
          {typesEmprunts.map((type, index) => {
            return (
              <Button
                index={index}
                variant={
                  type.text === typeEmprunts.text ? "contained" : "outlined"
                }
                style={{ margin: "0px 10px 10px 0px" }}
                onClick={() => {
                  setTypeEmprunts(type);
                }}
                color={type.color}
              >
                {type.text}
              </Button>
            );
          })}
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title Book</TableCell>
                <TableCell>Adherent FullName</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Amande</TableCell>
                <TableCell>Statut</TableCell>

                <TableCell align="center">action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row?.livre?.titre}</TableCell>
                  <TableCell>{row?.adherent?.fullname}</TableCell>
                  <TableCell>{row.nbCopie}</TableCell>
                  <TableCell>{makeDate(row.dateDebut)}</TableCell>
                  <TableCell>{makeDate(row.dateFin)}</TableCell>
                  <TableCell>{row.amende}.00DT</TableCell>
                  <TableCell>
                    <MakeChipStatus row={row} />
                  </TableCell>

                  <TableCell>
                    <Stack justifyContent="center" direction="row">
                      {row.statut === "EnAttente" && (
                        <ValidateBtn
                          onClick={() => {
                            handleAccept(row);
                          }}
                        />
                      )}

                      {row.statut === "EnAttente" && (
                        <RefuseBtn
                          onClick={() => {
                            handleRefuse(row);
                          }}
                        />
                      )}

                      {row.statut === "Emprunté" && (
                        <DoneBtn
                          onClick={() => {
                            handleFinish(row);
                          }}
                        />
                      )}

                      {row.amende !== 0 && (
                        <PayerBtn
                          onClick={() => {
                            PayerAmandeDone(row);
                          }}
                        />
                      )}
                      <ShowBtn
                        onClick={() => {
                          open_show(row);
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
            totalPages={pages?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
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

export default ManageEmprunts;
