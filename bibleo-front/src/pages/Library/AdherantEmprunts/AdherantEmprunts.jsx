import React, { useState, useEffect } from "react";
import PaginationComponent from "../../../components/PaginationComponent";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeDate } from "../../../functions/Dates.functions";
import { GetMyEmprunts } from "../../../redux/MyEmprunt.reducer";
import UserNavbar from "../../../layouts/UserNavbar/UserNavbar";

function AdherantEmprunts() {
  const data = useSelector((state) => state.MyEmpruntsReducers.emprunts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const itemsPerPage = 2; // Number of items per page

  useEffect(() => {
    dispatch(GetMyEmprunts());
  }, [dispatch]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserNavbar />

      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <h1 style={{ textAlign: "center" }}>My Emprunts</h1>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title Book</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Amande</TableCell>
                <TableCell>Statut</TableCell>

                <TableCell align="center">action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent
            totalPages={Math.ceil(data.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Paper>
      </Box>
    </Box>
  );
}

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

export default AdherantEmprunts;
