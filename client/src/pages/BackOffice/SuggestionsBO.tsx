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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface Suggestion {
  suggestion_id: number;
  name: string;
  price: number;
  origin: string;
  category: string;
  img_url: string;
  description: string;
  creation_date: string;
  modification_date: string;
  wine_url: string | null;
}

function SuggestionsBO() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [editSuggestion, setEditSuggestion] = useState<Suggestion | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/suggestion")
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    suggestion: Suggestion,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSuggestion(suggestion);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSuggestion(null);
  };

  const handleEdit = () => {
    setEditSuggestion(selectedSuggestion);
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const handleSubmitEdit = () => {
    if (editSuggestion) {
      fetch(
        `http://localhost:3310/api/suggestion/${editSuggestion.suggestion_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editSuggestion),
        },
      )
        .then(() => {
          setSuggestions(
            suggestions.map((s) =>
              s.suggestion_id === editSuggestion.suggestion_id
                ? editSuggestion
                : s,
            ),
          );
          setOpenEditModal(false);
        })
        .catch((error) =>
          console.error("Erreur lors de la modification:", error),
        );
    }
  };

  const handleDelete = () => {
    if (selectedSuggestion) {
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${selectedSuggestion.name} ?`,
        )
      ) {
        fetch(
          `http://localhost:3310/api/suggestion/${selectedSuggestion.suggestion_id}`,
          {
            method: "DELETE",
          },
        )
          .then(() => {
            setSuggestions(
              suggestions.filter(
                (s) => s.suggestion_id !== selectedSuggestion.suggestion_id,
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

  const handlePostToWines = async (suggestion: Suggestion) => {
    if (
      suggestion.name &&
      suggestion.price &&
      suggestion.origin &&
      suggestion.category &&
      suggestion.img_url &&
      suggestion.description &&
      suggestion.wine_url
    ) {
      try {
        await axios.post("http://localhost:3310/api/wines", {
          name: suggestion.name,
          price: suggestion.price,
          origin: suggestion.origin,
          category: suggestion.category,
          img_url: suggestion.img_url,
          description: suggestion.description,
          wine_url: suggestion.wine_url,
        });
        alert("Vin ajouté avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout du vin :", error);
      }
    } else {
      alert("Tous les champs doivent être renseignés avant d'ajouter le vin.");
    }
  };

  return (
    <div>
      <NavBar />
      <h1>SuggestionsBO</h1>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80%", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Origine</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>URL du Vin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suggestions.map((suggestion) => (
              <TableRow key={suggestion.suggestion_id}>
                <TableCell>
                  {suggestion.name || (
                    <span style={{ color: "red" }}>Nom manquant</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.price ? (
                    `${suggestion.price}€`
                  ) : (
                    <span style={{ color: "red" }}>Prix manquant</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.origin || (
                    <span style={{ color: "red" }}>Origine manquante</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.category || (
                    <span style={{ color: "red" }}>Catégorie manquante</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.img_url ? (
                    <img
                      src={suggestion.img_url}
                      alt={suggestion.name}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <span style={{ color: "red" }}>Image manquante</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.description || (
                    <span style={{ color: "red" }}>Description manquante</span>
                  )}
                </TableCell>
                <TableCell>
                  {suggestion.wine_url || (
                    <span style={{ color: "red" }}>URL manquante</span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={(e) => handleClickMenu(e, suggestion)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) &&
                      selectedSuggestion?.suggestion_id ===
                        suggestion.suggestion_id
                    }
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditIcon /> Modifier
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <DeleteIcon /> Supprimer
                    </MenuItem>
                    <MenuItem onClick={() => handlePostToWines(suggestion)}>
                      <AddIcon /> Ajouter à la liste des vins
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de modification */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Modifier la suggestion</Typography>
          <TextField
            label="Nom"
            fullWidth
            value={editSuggestion?.name || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, name: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
          />
          <TextField
            label="Prix"
            fullWidth
            value={editSuggestion?.price || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, price: Number(e.target.value) }
                  : null,
              )
            }
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Origine"
            fullWidth
            value={editSuggestion?.origin || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, origin: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
          />
          <TextField
            label="Catégorie"
            fullWidth
            value={editSuggestion?.category || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, category: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
          />
          <TextField
            label="URL de l'image"
            fullWidth
            value={editSuggestion?.img_url || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, img_url: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
          />
          <TextField
            label="Description"
            fullWidth
            value={editSuggestion?.description || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, description: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
          />
          <TextField
            label="URL du Vin"
            fullWidth
            value={editSuggestion?.wine_url || ""}
            onChange={(e) =>
              setEditSuggestion(
                editSuggestion
                  ? { ...editSuggestion, wine_url: e.target.value }
                  : null,
              )
            }
            margin="normal"
            required
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

export default SuggestionsBO;
