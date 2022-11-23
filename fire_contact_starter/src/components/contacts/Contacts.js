import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useFetch, DeleteUser } from "../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Contacts = ({ showInForm }) => {
  const { isLoading, contactList } = useFetch();

  return (
    <div>
      <h2 className="contact-header">Contacts</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              // Bilgiler gelmediği durumda Loading yazısı görünsün
              isLoading ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={5} align="center">
                    Loading
                  </TableCell>
                </TableRow>
              ) : contactList?.lenght === 0 ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={5} align="center">
                    No Result Found
                  </TableCell>
                </TableRow>
              ) : (
                contactList?.map((item, index) => (
                  <TableRow>
                    <TableCell align="left"> {item.username} </TableCell>
                    <TableCell align="left"> {item.phoneNumber} </TableCell>
                    <TableCell align="left"> {item.gender} </TableCell>
                    <TableCell align="left" onClick={() => DeleteUser(item.id)}>
                      <DeleteIcon />
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() =>
                        showInForm(
                          item.id,
                          item.username,
                          item.phoneNumber,
                          item.gender
                        )
                      }
                    >
                      <EditIcon />
                    </TableCell>
                  </TableRow>
                ))
              )
              // Bilgiler olmadığı,boş olduğu  durumda veri bulunamadı mesajı
              // Bilgiler geldiği zaman aşağıya yazılacak kodlar çalışsın
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contacts;
