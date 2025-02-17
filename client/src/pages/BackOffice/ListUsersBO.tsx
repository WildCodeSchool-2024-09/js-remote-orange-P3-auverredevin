import "./ListUsersBO.css";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
}

function ListUsersBO() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("firstname");

  useEffect(() => {
    fetch("http://localhost:3310/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: keyof User) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = (userId: number) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    );
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.user_id !== userId);
      setUsers(updatedUsers);
      fetch(`http://localhost:3310/api/users/${userId}`, { method: "DELETE" })
        .then(() => setUsers(updatedUsers))
        .catch((error) =>
          console.error("Erreur lors de la suppression :", error),
        );
    }
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="ListUsersBO">
      <NavBar />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginTop: 2 }}
      >
        Liste des utilisateurs
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80%", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "firstname"}
                  direction={order}
                  onClick={() => handleSort("firstname")}
                >
                  Prénom
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastname"}
                  direction={order}
                  onClick={() => handleSort("lastname")}
                >
                  Nom
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={order}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={() => handleDelete(user.user_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handlePageChange(event, newPage)}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ display: "flex", justifyContent: "center" }}
      />

      <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
        <Link to="/backoffice">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#9f0c00",
              "&:hover": { backgroundColor: "#dd1e0d" },
            }}
          >
            Index BackOffice
          </Button>
        </Link>
      </Box>
      <Footer />
    </div>
  );
}

export default ListUsersBO;
