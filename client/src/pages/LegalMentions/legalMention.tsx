import { Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const LegalMentions = () => {
  return (
    <>
      {" "}
      <NavBar />
      <Container
        maxWidth="md"
        sx={{ display: "flex", a: { color: "#9f0c00" } }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom color="#9f0c00">
            Mentions Légales
            <br />
            <img
              src="../src/assets/images/MentionsLegales.png"
              alt="LogoMentionLégales"
            />
          </Typography>
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>1. Éditeur du site :</strong>
              <br />
            </Typography>
            Nom du site : Au Verre de Vin <br />
            URL : <Link to="/"> www.auverredevin.com </Link>
            <br />
            Responsable de publication :{" "}
            <a href="https://www.wildcodeschool.com/">Wild Code School</a>{" "}
            <br />
            Contact :{" "}
            <a href="mailto:lequipeauverredevin@gmail.com">
              lequipeauverredevin@gmail.com
            </a>
            <br />
            Adresse : 2 rue du vin 75000 Paris
            <br />
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>2. Hébergeur du site :</strong>
              <br />
            </Typography>
            Nom de l'hébergeur : Vercel
            <br />
            Adresse : <a href="https://vercel.com/">Vercel.com</a>
            <br />
            Contact :{" "}
            <a href="mailto:startups@vercel.com">startups@vercel.com</a>
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>3. Description des services fournis :</strong>
              <br />
            </Typography>
            Le site Au Verre de Vin a pour vocation de référencer des vins et de
            proposer des liens vers des sites d'achat en ligne, ainsi qu'une
            liste d'événements de dégustation de vin. Les informations publiées
            sont fournies à titre informatif et n'ont aucune valeur
            contractuelle.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>4. Responsabilités :</strong>
              <br />
            </Typography>
            Le site Au Verre de Vin ne vend pas directement de vin et ne peut
            être tenu responsable des transactions effectuées sur les sites
            tiers vers lesquels il redirige les utilisateurs.
            <br />
            Les événements listés sont fournis à titre indicatif et peuvent être
            sujets à modification sans préavis. Il est recommandé de vérifier
            les informations directement auprès des organisateurs.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>5. Propriété intellectuelle :</strong>
              <br />
            </Typography>
            L'ensemble des contenus présents sur le site (Au Verre de Vin) -
            textes, images, logos, etc. - sont protégés par le droit d'auteur et
            la propriété intellectuelle. Toute reproduction ou utilisation sans
            autorisation expresse est interdite.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>6. Protection des données personnelles :</strong>
              <br />
            </Typography>
            Les données collectées via le site (Au Verre de Vin) sont destinées
            à l'usage exclusif de l'éditeur du site. Conformément au Règlement
            Général sur la Protection des Données (RGPD), l'utilisateur dispose
            d'un droit d'accès, de rectification et de suppression de ses
            données personnelles en contactant :{" "}
            <a href="mailto:lequipeauverredevin@gmail.com">
              lequipeauverredevin@gmail.com
            </a>
            .
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>7. Liens hypertextes :</strong>
              <br />
            </Typography>
            Le site Au Verre de Vin propose des liens vers des sites tiers.
            L'éditeur du site décline toute responsabilité concernant le contenu
            et les pratiques de ces sites externes.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>8. Consommation d'alcool :</strong>
              <br />
            </Typography>
            L'abus d'alcool est dangereux pour la santé, à consommer avec
            modération. Ce site est destiné aux personnes majeures selon la
            législation en vigueur dans leur pays de résidence.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>9. Droit applicable :</strong>
              <br />
            </Typography>
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige, et à défaut de règlement amiable, les tribunaux
            français seront seuls compétents.
          </Typography>
          <br />
          <Typography variant="body1" component="p">
            <Typography variant="h5" component="p" gutterBottom color="#9f0c00">
              <strong>10. Contact :</strong>
              <br />
            </Typography>
            Pour toute question concernant ces mentions légales, vous pouvez
            nous contacter à :{" "}
            <a href="mailto:lequipeauverredevin@gmail.com">
              lequipeauverredevin@gmail.com
            </a>
            .
          </Typography>
          <br />
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default LegalMentions;
