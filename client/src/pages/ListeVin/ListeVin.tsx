import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import SuggestionVin from "../../components/Suggestion/Suggestion";
import "./ListeVin.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export interface Wine {
  wine_id: number;
  name: string;
  img_url: string;
  category: string;
  origin: string;
  price: number;
  description: string | null;
  wine_url: string | null;
}

function WinesList() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [openModal, setOpenModal] = useState(false); // ✅ État pour gérer l'ouverture de la modal

  useEffect(() => {
    fetch("http://localhost:3310/api/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOpenModal = () => setOpenModal(true);

  // Déduire les valeurs uniques
  const origins = [...new Set(wines.map((wine) => wine.origin))].sort();
  const categories = [...new Set(wines.map((wine) => wine.category))].sort();
  const priceRanges = [
    { label: "Tous les prix", value: "" },
    { label: "Moins de 10€", value: "10" },
    { label: "10€ - 15€", value: "10-15" },
    { label: "15€ - 30€", value: "15-30" },
    { label: "Plus de 30€", value: "30" },
  ];

  useEffect(() => {
    let result = wines;

    if (searchTerm) {
      result = result.filter((wine) =>
        wine.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedOrigin) {
      result = result.filter((wine) => wine.origin === selectedOrigin);
    }

    if (selectedCategory) {
      result = result.filter((wine) => wine.category === selectedCategory);
    }

    if (selectedPrice) {
      result = result.filter((wine) => {
        switch (selectedPrice) {
          case "10":
            return wine.price < 10;
          case "10-15":
            return wine.price >= 10 && wine.price <= 15;
          case "15-30":
            return wine.price > 15 && wine.price <= 30;
          case "30":
            return wine.price > 30;
          default:
            return true;
        }
      });
    }

    setFilteredWines(result);
  }, [searchTerm, selectedOrigin, selectedCategory, selectedPrice, wines]);

  return (
    <>
      <NavBar />
      <h1>Nos Vins</h1>
      <section className="filters">
        {/* Filtres */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
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

          <Box sx={{ display: "flex", gap: 2, width: "120%" }}>
            <FormControl fullWidth>
              <InputLabel id="origin-select-label">Origine</InputLabel>
              <Select
                labelId="origin-select-label"
                id="origin-select"
                value={selectedOrigin}
                label="Origine"
                onChange={(e) => setSelectedOrigin(e.target.value)}
              >
                <MenuItem value="">Toutes les origines</MenuItem>
                {origins.map((origin) => (
                  <MenuItem key={origin} value={origin}>
                    {origin}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-select-label">Catégorie</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                label="Catégorie"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">Toutes les catégories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="price-select-label">Prix</InputLabel>
              <Select
                labelId="price-select-label"
                id="price-select"
                value={selectedPrice}
                label="Prix"
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </section>

      {/* Liste des vins */}
      <div className="cards-wines">
        <div>
          {filteredWines.length === 0 && (
            <p>Aucun vin ne correspond à votre recherche.</p>
          )}
        </div>
        {/* Carte "Ajouter un vin" */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <article className="cards-wine add-wine-card" onClick={handleOpenModal}>
          <h3>Ajouter un vin</h3>
          <p>Cliquez pour ajouter un vin</p>
        </article>
        {filteredWines.map((wine) => (
          <article className="cards-wine" key={wine.wine_id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/${wine.img_url}`}
              alt={wine.name}
            />
            <h3>{wine.name}</h3>
            <p>Origine : {wine.origin || "Non spécifiée"}</p>
            <p>Catégorie : {wine.category}</p>
            <p>Prix : {wine.price}€</p>
            {wine.description && <p>{wine.description}</p>}
            <Button
              sx={{
                backgroundColor: "#9f0c00",
                color: "whitesmoke",
                ":hover": { backgroundColor: "#dd1e0d" },
              }}
              onClick={() => {
                if (wine.wine_url) {
                  window.open(wine.wine_url, "_blank");
                }
              }}
            >
              Voir le vin
            </Button>
          </article>
        ))}
      </div>

      {/* Modal */}
      <SuggestionVin openModal={openModal} setOpenModal={setOpenModal} />

      <Footer />
    </>
  );
}

export default WinesList;
