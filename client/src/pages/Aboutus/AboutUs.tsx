import "./AboutUs.css";
import { Box } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function AboutUs() {
  return (
    <>
      <NavBar />

      <div className="AboutBox">
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1>À propos de nous</h1>
          <div className="aboutimg">
            <img src="../src/assets/images/AboutUS.png" alt="Logo" />
          </div>

          <p className="Abouttext">
            Passionnés par les vins français, nous avons créé ce site pour
            partager la richesse et la diversité de nos terroirs. De Bordeaux à
            la Provence, chaque bouteille raconte une histoire que nous
            souhaitons vous faire découvrir.
          </p>
          <p className="Abouttext">
            Que vous soyez amateur ou curieux, embarquez avec nous dans un
            voyage sensoriel au cœur des vignobles français.
          </p>
          <p className="Abouttext">À votre santé 🍷!</p>
        </Box>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
