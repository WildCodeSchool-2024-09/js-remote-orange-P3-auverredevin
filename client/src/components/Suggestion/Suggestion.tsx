import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

interface SuggestionVinProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function SuggestionVin({
  openModal,
  setOpenModal,
}: SuggestionVinProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setOrigin("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const userId = 1; // Replace with the actual user ID
      if (!userId) {
        throw new Error("User ID is required");
      }
      await axios.post("http://localhost:3310/api/suggestion", {
        user_id: userId,
        name,
        price,
        origin,
        description,
        creation_date: currentDate,
        modification_date: currentDate,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout du vin :", error);
    }
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          width: 300,
          bgcolor: "background.paper",
          p: 2,
          m: "auto",
          borderRadius: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
        }}
      >
        <Box mt={1} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src="../src/assets/images/logo.png"
            alt="wine bottle"
            style={{ width: "80%", height: "auto" }} // Taille réduite de l'image
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small" // Champs plus petits
            margin="dense"
            label="Nom du vin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Prix (€)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Origine"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <TextField
            fullWidth
            size="small"
            margin="dense"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2} // Moins de lignes
          />
          <Stack spacing={1} direction="column" mt={1}>
            <Button
              type="submit"
              size="small" // Boutons plus petits
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              variant="contained"
              fullWidth
            >
              Ajouter
            </Button>
            <Button
              type="button"
              size="small"
              onClick={handleCloseModal}
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              variant="contained"
              fullWidth
            >
              Fermer
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
