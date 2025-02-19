import "./ListEventsBO.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./ListEventsBO.css";

interface Tasting {
  tasting_id: number;
  name: string;
  date: string;
  city_name: string;
  website_url: string;
}

function ListEventsBO() {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTasting, setSelectedTasting] = useState<Tasting | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [editTasting, setEditTasting] = useState<Tasting | null>(null);
  const [newTasting, setNewTasting] = useState<Tasting>({
    tasting_id: 0,
    name: "",
    date: "",
    city_name: "",
    website_url: "",
  });

  useEffect(() => {
    fetch("http://localhost:3310/api/tastings")
      .then((response) => response.json())
      .then((data) => setTastings(data))
      .catch((error) => console.error(error));
  }, []);

  // Get the cities
  const cities = [
    ...new Set(tastings.map((tasting) => tasting.city_name)),
  ].sort();

  // Filter and sort tastings
  const filteredTastings = tastings
    .filter((tasting) => !selectedCity || tasting.city_name === selectedCity)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTastings.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredTastings.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // Fonction pour le menu d'actions
  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    tasting: Tasting,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTasting(tasting);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTasting(null);
  };

  // Fonctions CRUD
  const handleDelete = () => {
    if (selectedTasting) {
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${selectedTasting.name} ?`,
        )
      ) {
        fetch(
          `http://localhost:3310/api/tastings/${selectedTasting.tasting_id}`,
          {
            method: "DELETE",
          },
        )
          .then(() => {
            setTastings(
              tastings.filter(
                (t) => t.tasting_id !== selectedTasting.tasting_id,
              ),
            );
            handleCloseMenu();
          })
          .catch((error) =>
            console.error("Erreur lors de la suppression:", error),
          );
      }
    }
  };

  const handleEdit = () => {
    setEditTasting(selectedTasting);
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const handleSubmitEdit = () => {
    if (editTasting) {
      fetch(`http://localhost:3310/api/tastings/${editTasting.tasting_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTasting),
      })
        .then(() => {
          setTastings(
            tastings.map((t) =>
              t.tasting_id === editTasting.tasting_id ? editTasting : t,
            ),
          );
          setOpenEditModal(false);
        })
        .catch((error) =>
          console.error("Erreur lors de la modification:", error),
        );
    }
  };

  const handleAddTasting = () => {
    fetch("http://localhost:3310/api/tastings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTasting),
    })
      .then((response) => response.json())
      .then((data) => {
        setTastings([...tastings, data]);
        setOpenAddModal(false);
      })
      .catch((error) => console.error("Erreur lors de l'ajout:", error));
  };

  return (
    <div className="ListEventsBO">
      <NavBar />
      <h1>ListEventsBO</h1>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <FormControl className="form-control">
          <InputLabel>Ville</InputLabel>
          <Select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            label="Ville"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Toutes les villes</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <Button
                  sx={{
                    color: "whitesmoke",
                    backgroundColor: "#9f0c00",
                    "&:hover": { backgroundColor: "#dd1e0d" },
                  }}
                  onClick={() => setOpenAddModal(true)}
                  startIcon={<AddIcon />}
                >
                  Ajouter un événement
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="table-cell-sortable"
              >
                Date {sortOrder === "asc" ? "↑" : "↓"}
              </TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Site officiel</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((tasting) => (
              <TableRow key={tasting.tasting_id}>
                <TableCell>{tasting.name}</TableCell>
                <TableCell>
                  {new Date(tasting.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{tasting.city_name}</TableCell>
                <TableCell>
                  <a
                    href={tasting.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9f0c00" }}
                  >
                    Visiter
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={(e) => handleClickMenu(e, tasting)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) &&
                      selectedTasting?.tasting_id === tasting.tasting_id
                    }
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditIcon /> Modifier
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <DeleteIcon /> Supprimer
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal d'ajout */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Ajouter un événement</Typography>
          <TextField
            label="Nom"
            fullWidth
            value={newTasting.name}
            onChange={(e) =>
              setNewTasting({ ...newTasting, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newTasting.date}
            onChange={(e) =>
              setNewTasting({ ...newTasting, date: e.target.value })
            }
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="Ville"
            fullWidth
            value={newTasting.city_name}
            onChange={(e) =>
              setNewTasting({ ...newTasting, city_name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Site web"
            fullWidth
            value={newTasting.website_url}
            onChange={(e) =>
              setNewTasting({ ...newTasting, website_url: e.target.value })
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTasting}
            sx={{ mt: 2 }}
          >
            Ajouter
          </Button>
        </Box>
      </Modal>

      {/* Modal de modification */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Modifier l'événement</Typography>
          <TextField
            label="Nom"
            fullWidth
            value={editTasting?.name || ""}
            onChange={(e) =>
              setEditTasting(
                editTasting ? { ...editTasting, name: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={editTasting?.date || ""}
            onChange={(e) =>
              setEditTasting(
                editTasting ? { ...editTasting, date: e.target.value } : null,
              )
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Ville"
            fullWidth
            value={editTasting?.city_name || ""}
            onChange={(e) =>
              setEditTasting(
                editTasting
                  ? { ...editTasting, city_name: e.target.value }
                  : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="Site web"
            fullWidth
            value={editTasting?.website_url || ""}
            onChange={(e) =>
              setEditTasting(
                editTasting
                  ? { ...editTasting, website_url: e.target.value }
                  : null,
              )
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitEdit}
            sx={{ mt: 2 }}
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>

      <Stack spacing={2} sx={{ padding: "20px", alignItems: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ "& .MuiPaginationItem-root": { color: "#9f0c00" } }}
          showFirstButton
          showLastButton
        />
        <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
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
      </Stack>
      <Footer />
    </div>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: 400,
};

export default ListEventsBO;
