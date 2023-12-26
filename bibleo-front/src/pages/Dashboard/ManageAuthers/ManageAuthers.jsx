import React from "react";

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
import ShowBtn from "../../../components/Buttons/ShowBtn";
import DeleteBtn from "../../../components/Buttons/DeleteBtn";

const rows = [
  {
    id: 1,
    title: "title1",
    location: "location1",
    date: "date1",
    time: "time1",
    show: true,
  },
  {
    id: 2,
    title: "title2",
    location: "location2",
    date: "date2",
    time: "time2",
    show: true,
  },
  {
    id: 3,
    title: "title3",
    location: "location3",
    date: "date3",
    time: "time3",
    show: true,
  },
  {
    id: 4,
    title: "title4",
    location: "location4",
    date: "date4",
    time: "time4",
    show: true,
  },
];

function ManageAuthers() {
  return (
    <Paper sx={{ p: 2 }}>
      <h2>
        Manage Authers{" "}
        <Button variant="outlined" endIcon={<AddIcon />}>
          Add Auther
        </Button>
      </h2>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>location</TableCell>
            <TableCell>date</TableCell>
            <TableCell>time</TableCell>
            <TableCell>show</TableCell>
            <TableCell align="center">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.show ? "YES" : "NO"}</TableCell>

              <TableCell>
                <Stack justifyContent="center" direction="row">
                  <ShowBtn onClick={() => {}} />
                  <ModifBtn onClick={() => {}} />
                  <DeleteBtn onClick={() => {}} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ManageAuthers;
