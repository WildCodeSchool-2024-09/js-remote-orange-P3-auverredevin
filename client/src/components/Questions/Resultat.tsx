import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAnswers } from "../../Context/AnswersScore";

interface Wine {
  img_url: string | undefined;
  origin: string;
  price: number;
  description: string | null;
  wine_url: string | null;
  category: string;
  name: string;
}

function Result() {
  const { answers } = useAnswers();
  const [, setWines] = useState<Wine[]>([]);
  const [suggestedWine, setSuggestedWine] = useState<Wine | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(data);
        suggestWine(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getScoreValue = (questionId: number, answerId: number): number => {
    switch (questionId) {
      case 1:
      case 2:
      case 3:
        return answerId;
      default:
        return 0;
    }
  };

  const suggestWine = (wines: Wine[]) => {
    let bestWine: Wine | null = null;
    let highestScore = 0;

    for (const wine of wines) {
      let score = 0;

      for (const answer of answers) {
        const scoreValue = getScoreValue(answer.questionId, answer.answerId);

        switch (answer.questionId) {
          case 1:
            if (wine.category === getCategory(answer.answerId)) {
              score += scoreValue;
            }
            break;
          case 2:
            if (wine.price <= getPriceRange(answer.answerId)) {
              score += scoreValue;
            }
            break;
          case 3:
            if (wine.origin === getOrigin(answer.answerId)) {
              score += scoreValue;
            }
            break;
          default:
            break;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestWine = wine;
      }
    }
    setSuggestedWine(bestWine);
  };

  const getCategory = (answerId: number) => {
    switch (answerId) {
      case 1:
        return "Rouge";
      case 2:
        return "Blanc";
      case 3:
        return "Rosé";
      case 4:
        return "Pétillant";
      default:
        return "";
    }
  };

  const getPriceRange = (answerId: number) => {
    switch (answerId) {
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
        return 50;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  const getOrigin = (answerId: number) => {
    switch (answerId) {
      case 1:
        return "France";
      case 2:
        return "Italie";
      case 3:
        return "Espagne";
      case 4:
        return "USA";
      default:
        return "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      {suggestedWine ? (
        <Card
          sx={{
            maxWidth: 345,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={"../src/assets/images/logo.png"}
            alt={suggestedWine?.name}
            sx={{ borderRadius: 1, objectFit: "cover" }}
          />
          <CardContent sx={{ gap: 2, textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {suggestedWine?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Origine: {suggestedWine?.origin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Catégorie: {suggestedWine?.category}
            </Typography>
            <Typography variant="h6" color="text.primary" align="center">
              Prix: {suggestedWine?.price}€
            </Typography>
            {suggestedWine?.description && (
              <Typography variant="body2" color="text.secondary">
                {suggestedWine.description}
              </Typography>
            )}
            {suggestedWine?.wine_url && (
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#9f0c00",
                  ":hover": { backgroundColor: "#dd1e0d" },
                  padding: "10px 20px",
                  fontSize: "16px",
                }}
                href={suggestedWine.wine_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le vin
              </Button>
            )}
          </CardContent>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#9f0c00",
              ":hover": { backgroundColor: "#dd1e0d" },
              padding: "10px 20px",
              fontSize: "16px",
            }}
            onClick={() => window.location.reload()}
          >
            Recommencer le quiz
          </Button>
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Aucun vin ne correspond à vos critères.
        </Typography>
      )}
    </Box>
  );
}

export default Result;
