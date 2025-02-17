import "./ListWinesBO.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

// Définition d'un type Wine
interface Wine {
  wine_id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  img_url: string;
  description?: string;
}

function ListWinesBO() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [newWine, setNewWine] = useState<Wine>({
    wine_id: 0,
    name: "",
    origin: "",
    category: "",
    price: 0,
    img_url: "",
    description: "",
  });
  const [editWine, setEditWine] = useState<Wine | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
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

  useEffect(() => {
    let filtered = wines;
    if (searchTerm) {
      filtered = filtered.filter((wine) =>
        wine.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredWines(filtered);
  }, [searchTerm, wines]);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    wine: Wine,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedWine(wine);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedWine(null);
  };

  const handleDelete = () => {
    if (selectedWine) {
      // Confirmation avant suppression
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${selectedWine.name} ?`,
        )
      ) {
        fetch(`http://localhost:3310/api/wines/${selectedWine.wine_id}`, {
          method: "DELETE",
        })
          .then(() => {
            setWines(
              wines.filter((wine) => wine.wine_id !== selectedWine.wine_id),
            );
            setFilteredWines(
              filteredWines.filter(
                (wine) => wine.wine_id !== selectedWine.wine_id,
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
    setEditWine(selectedWine);
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const handleSubmitEdit = () => {
    if (editWine) {
      fetch(`http://localhost:3310/api/wines/${editWine.wine_id}`, {
        method: "PUT",
        body: JSON.stringify(editWine),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setWines(
            wines.map((wine) =>
              wine.wine_id === editWine.wine_id ? editWine : wine,
            ),
          );
          setFilteredWines(
            filteredWines.map((wine) =>
              wine.wine_id === editWine.wine_id ? editWine : wine,
            ),
          );
          setOpenEditModal(false);
        })
        .catch((error) =>
          console.error("Erreur lors de la modification:", error),
        );
    }
  };

  const handleAddWine = () => {
    fetch("http://localhost:3310/api/wines", {
      method: "POST",
      body: JSON.stringify(newWine),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWines([...wines, data]);
        setFilteredWines([...filteredWines, data]);
        setOpenAddModal(false);
      })
      .catch((error) => console.error("Erreur lors de l'ajout:", error));
  };

  const paginatedWines = filteredWines.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div>
      <NavBar />
      <section className="ListWinesBO">
        <h1>Liste des Vins - BackOffice</h1>

        <Box sx={{ mb: 3, padding: 2, maxWidth: "80%", margin: "auto" }}>
          <TextField
            fullWidth
            label="Rechercher un vin..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9f0c00",
                },
                "&:hover fieldset": {
                  borderColor: "#9f0c00",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9f0c00",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9f0c00",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9f0c00",
              },
            }}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{ maxWidth: "80%", margin: "auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="table des vins">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Origine</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Prix (€)</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Ligne pour ajouter un vin */}
              <TableRow>
                <TableCell colSpan={7}>
                  <Button
                    sx={{
                      color: "whitesmoke",
                      backgroundColor: "#9f0c00",
                      "&:hover": { backgroundColor: "#dd1e0d" },
                    }}
                    onClick={() => setOpenAddModal(true)}
                    startIcon={<AddIcon />}
                  >
                    Ajouter un vin
                  </Button>
                </TableCell>
              </TableRow>
              {paginatedWines.map((wine) => (
                <TableRow key={wine.wine_id}>
                  <TableCell>{wine.name}</TableCell>
                  <TableCell>{wine.origin || "Non spécifiée"}</TableCell>
                  <TableCell>{wine.category}</TableCell>
                  <TableCell>{wine.price}€</TableCell>
                  <TableCell>
                    {wine.description || "Aucune description"}
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${wine.img_url}`}
                      alt={wine.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={(e) => handleClickMenu(e, wine)}
                    >
                      <AddIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={
                        Boolean(anchorEl) &&
                        selectedWine?.wine_id === wine.wine_id
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
      </section>

      {/* Modal d'ajout de vin */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Ajouter un vin
          </Typography>
          <TextField
            label="Nom"
            fullWidth
            value={newWine.name}
            onChange={(e) => setNewWine({ ...newWine, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Origine"
            fullWidth
            value={newWine.origin}
            onChange={(e) => setNewWine({ ...newWine, origin: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Catégorie"
            fullWidth
            value={newWine.category}
            onChange={(e) =>
              setNewWine({ ...newWine, category: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Prix"
            fullWidth
            value={newWine.price}
            onChange={(e) =>
              setNewWine({
                ...newWine,
                price: Number.parseFloat(e.target.value),
              })
            }
            margin="normal"
            type="number"
          />
          <TextField
            label="Description"
            fullWidth
            value={newWine.description}
            onChange={(e) =>
              setNewWine({ ...newWine, description: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="URL de l'image"
            fullWidth
            value={newWine.img_url}
            onChange={(e) =>
              setNewWine({ ...newWine, img_url: e.target.value })
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddWine}
            sx={{ marginTop: 2 }}
          >
            Ajouter
          </Button>
        </Box>
      </Modal>

      {/* Modal de modification */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Modifier le vin
          </Typography>
          <TextField
            label="Nom"
            fullWidth
            value={editWine?.name || ""}
            onChange={(e) =>
              setEditWine(
                editWine ? { ...editWine, name: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="Origine"
            fullWidth
            value={editWine?.origin || ""}
            onChange={(e) =>
              setEditWine(
                editWine ? { ...editWine, origin: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="Catégorie"
            fullWidth
            value={editWine?.category || ""}
            onChange={(e) =>
              setEditWine(
                editWine ? { ...editWine, category: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="Prix"
            fullWidth
            value={editWine?.price || ""}
            onChange={(e) =>
              setEditWine(
                editWine
                  ? { ...editWine, price: Number.parseFloat(e.target.value) }
                  : null,
              )
            }
            margin="normal"
            type="number"
          />
          <TextField
            label="Description"
            fullWidth
            value={editWine?.description || ""}
            onChange={(e) =>
              setEditWine(
                editWine ? { ...editWine, description: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <TextField
            label="URL de l'image"
            fullWidth
            value={editWine?.img_url || ""}
            onChange={(e) =>
              setEditWine(
                editWine ? { ...editWine, img_url: e.target.value } : null,
              )
            }
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitEdit}
            sx={{ marginTop: 2 }}
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={wines.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handlePageChange(event, newPage)}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{
          maxWidth: "80%",
          margin: "auto",
          backgroundColor: "white",
          borderTop: "1px solid #ddd",
          padding: "8px 16px",
        }}
      />
      <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
        <Link to="/backoffice">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#9f0c00",
              "&:hover": { backgroundColor: "#dd1e0d" },
              mt: 2,
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default ListWinesBO;
