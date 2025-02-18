// @ts-nocheck
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  handleLogin: (login: string, password: string) => Promise<void>;
  handleRegister: (login: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  isAuth: boolean;
  message: string | null;
  user: string | null;
}

interface UserProps {
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
}

export const AuthContext = createContext<AuthContextType | null>(null);

import type { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (login: string, password: string) => {
    if (login === null || password === null) {
      setMessage("Veuillez saisir les datas");
      return;
    }

    const values = { login: login, password: password };

    const response = await axios.post<{ message: string; user?: string }>(
      "http://localhost:3310/api/auth/signin",
      {
        method: "POST",
        values: values,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    if (data.message && data.user) {
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  };

  interface LoginResponse {
    token: string;
    user: {
      user_id: number;
      role_id: number;
      firstname: string;
      lastname: string;
    };
    message: string;
  }

  const handleLogin = async (login: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/api/auth/signin`,
        {
          values: { login, password }, // Modification ici pour matcher avec le format attendu par le serveur
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { data } = response;

      if (data.token && data.user) {
        setIsAuth(true);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role_id", data.user.role_id.toString());
        return true;
      }
      setIsAuth(false);
      setMessage(data.message || "Échec de l'authentification");
      return false;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      console.error("Erreur détaillée:", error.response?.data || error.message);
      setIsAuth(false);
      setMessage(
        error.response?.data?.message || "Erreur de connexion au serveur",
      );
      return false;
    }
  };

  const handleLogout = async () => {
    await handleClean();
  };

  const currentUser = async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check`,
          {
            headers: { token: token },
          },
        );

        if ((data as { check: boolean })?.check) {
          setIsAuth(true);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          await handleClean();
        }
      } catch (error) {
        await handleClean();
      }
    } else {
      await handleClean();
    }
  };

  const handleClean = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      currentUser();
    }, 5000); // toutes les minutes

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
        isAuth,
        message,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Pour utiliser useAuth context est necessaire");
  return { ...context };
};
