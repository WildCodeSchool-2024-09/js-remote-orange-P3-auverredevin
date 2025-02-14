import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
const checkLoginExists = async (login: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3310/api/users/check-login/${login}`,
    );
    const data = response.data as { exists: boolean };
    return data.exists; // true si le login est déjà pris
  } catch (error) {
    console.error("Erreur lors de la vérification du login:", error);
    return false; // En cas d'erreur, on suppose que le login n'existe pas
  }
};

function Inscription() {
  const [formData, setFormData] = useState({
    login: "",
    firstname: "",
    lastname: "",
    date_of_birth: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstname) newErrors.firstname = "Le prénom est requis";
    if (!formData.lastname) newErrors.lastname = "Le nom est requis";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "La date de naissance est requise";
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    if (!formData.login) newErrors.login = "Le pseudo est requis";
    if (formData.login.length < 3)
      newErrors.login = "Le pseudo doit contenir au moins 3 caractères";
    const loginExists = await checkLoginExists(formData.login);
    if (loginExists) newErrors.login = "Le pseudo est déjà pris";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:3310/api/users", formData);
      navigate("/welcome");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box
          mt={5}
          textAlign="center"
          bgcolor="whitesmoke"
          p={3}
          borderRadius={2}
        >
          <Typography variant="h4">INSCRIPTION</Typography>
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="../src/assets/images/avvatar.png"
              alt="avatar"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Prénom"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              error={!!errors.firstname}
              helperText={errors.firstname}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nom"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Pseudo"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
              error={!!errors.login}
              helperText={errors.login}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date de naissance"
              name="date_of_birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
              }
              label="Acceptez-vous de recevoir nos offres personnalisées par email"
            />
            <Button
              sx={{
                backgroundColor: "#9f0c00",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              S'inscrire
            </Button>
          </form>
          <Box mt={2}>
            <Link to="/connexion">Déjà inscrit ? Connectez-vous</Link>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Inscription;
