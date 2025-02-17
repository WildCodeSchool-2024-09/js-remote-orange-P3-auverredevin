// @ts-nocheck
import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

type UserProps = {
  id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  login: string;
  password: string;
  email: string;
  date_of_birth: Date;
  phone: string;
  address: string;
  creation_date: string;
  modification_date: string;
  role_id: number;
  last_update: string;
  token: string;
};

function UserInfoModule() {
  const { user }: { user: UserProps | null } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  function handleUpdate() {
    if (!user) {
      console.error("User not found");
      return;
    }

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);

    fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.status === 204) {
          navigate("/userInfo");
        } else {
          console.error("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error updating user", error);
      });
  }

  return (
    <Container
      id="userInfoModule"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        mt: 5,
        p: 3,
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Vos informations
      </Typography>
      <Typography>
        Prénom:{" "}
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Typography>
        Nom:{" "}
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Typography>
        Mot de passe:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Typography>
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Typography>
        Téléphone:{" "}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Typography>
        Adresse:{" "}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        component={Link}
        to="/userInfo"
      >
        Modifier
      </Button>
    </Container>
  );
}

export default UserInfoModule;
