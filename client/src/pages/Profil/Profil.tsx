import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const Profil = () => {
  // données fictives test
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "0123456789",
    address: "123 Rue Example",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({ ...userInfo });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUserInfo(tempInfo);
    setIsEditing(false);
  };

  return (
    <>
      <NavBar />
      <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
          <Typography variant="h5" className="text-2xl">
            Mon Profil
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <InputLabel htmlFor="firstName">Prénom</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={isEditing ? tempInfo.firstName : userInfo.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <InputLabel htmlFor="lastName">Nom</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  value={isEditing ? tempInfo.lastName : userInfo.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={isEditing ? tempInfo.email : userInfo.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="phone">Téléphone</InputLabel>
              <Input
                id="phone"
                name="phone"
                value={isEditing ? tempInfo.phone : userInfo.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="address">Adresse</InputLabel>
              <Input
                id="address"
                name="address"
                value={isEditing ? tempInfo.address : userInfo.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            {isEditing && (
              <div className="space-y-2">
                <InputLabel htmlFor="password">
                  Mot de passe (laisser vide si inchangé)
                </InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={tempInfo.password}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => {
                    setTempInfo({ ...userInfo });
                    setIsEditing(true);
                  }}
                >
                  Modifier
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setTempInfo({ ...userInfo });
                    }}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">Sauvegarder</Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default Profil;
