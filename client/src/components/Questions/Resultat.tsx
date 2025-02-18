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
    // Scores based on your answers table in the database
    switch (questionId) {
      case 1: // Type de vin
        return answerId; // 1 for Rouge, 2 for Blanc, 3 for Rosé, 4 for Pétillant
      case 2: // Price range
        return answerId; // 1 for Léger, 2 for Modéré, 3 for Puissant
      case 3: // Origin
        return answerId; // 1 for Fruité, 2 for Sec, 3 for Sucré, 4 for Boisé
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
    <div>
      <h1>Résultat</h1>
      {suggestedWine ? (
        <div>
          <h2>{suggestedWine.name}</h2>
          <img src={suggestedWine.img_url} alt={suggestedWine.name} />
          <p>Origine : {suggestedWine.origin}</p>
          <p>Catégorie : {suggestedWine.category}</p>
          <p>Prix : {suggestedWine.price}€</p>
          {suggestedWine.description && <p>{suggestedWine.description}</p>}
          {suggestedWine.wine_url && (
            <a
              href={suggestedWine.wine_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le vin
            </a>
          )}
        </div>
      ) : (
        <p>Aucun vin ne correspond à vos critères.</p>
      )}
      <button type="button" onClick={() => window.location.reload()}>
        Recommencer le quiz
      </button>
    </div>
  );
}

export default Result;
