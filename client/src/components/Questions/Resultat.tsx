// @ts-ignore
import { useEffect, useState } from "react";
import { useAnswers } from "../../Context/AnswersScore";

interface Wine {
  wine_id: number;
  name: string;
  img_url: string;
  category: string;
  origin: string;
  price: number;
  description: string | null;
  wine_url: string | null;
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

  const suggestWine = (wines: Wine[]) => {
    // Filter wines based on selected answers
    const filteredWines = wines.filter((wine) => {
      return answers.every((answer) => {
        switch (answer.questionId) {
          case 1:
            return wine.category === getCategory(answer.answerId);
          case 2:
            return wine.price <= getPriceRange(answer.answerId);
          case 3:
            return wine.origin === getOrigin(answer.answerId);
          default:
            return true;
        }
      });
    });

    // Select a random wine from the filtered list
    if (filteredWines.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredWines.length);
      setSuggestedWine(filteredWines[randomIndex]);
    }
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
      <h1>Result</h1>
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
