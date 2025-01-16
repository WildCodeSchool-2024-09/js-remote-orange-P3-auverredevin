import "./Degustation.css";
import { useEffect, useState } from "react";

interface Tasting {
  tasting_id: number;
  name: string;
  date: string;
  city_name: string;
  website_url: string;
}
function Degustation() {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/tastings")
      .then((response) => response.json())
      .then((data) => setTastings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Degustation">
      <h1>Dégustations</h1>
      {tastings.map((tasting: Tasting) => (
        <div key={tasting.tasting_id}>
          <h3>{tasting.name}</h3>
          <p>Date : {tasting.date}</p>
          <p>Ville : {tasting.city_name}</p>
          <a href={tasting.website_url}>Site officiel</a>
        </div>
      ))}
    </div>
  );
}

export default Degustation;
