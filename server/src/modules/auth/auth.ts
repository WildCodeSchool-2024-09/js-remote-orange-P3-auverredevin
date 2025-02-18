// @ts-nocheck
import type { RequestHandler } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import usersRepository from "../users/usersRepository";

const SignIn: RequestHandler = async (req, res, next) => {
  try {
    const { login, password } = req.body.values; // Notez le .values ici

    if (!login || !password) {
      return res.status(400).json({ message: "Login et mot de passe requis" });
    }

    const user = await usersRepository.checkuser(login, password);

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role_id: user.role_id,
      },
      process.env.APP_SECRET,
      { expiresIn: "2 days" },
    );

    res.json({
      token,
      user: {
        user_id: user.user_id,
        role_id: user.role_id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      message: "Connexion réussie",
    });
  } catch (err) {
    next(err);
  }
};

const SignUp: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const user = await usersRepository.readAll();

    // Respond with the items in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const Check: RequestHandler = async (req, res, next) => {
  const token = req.headers.token as string;

  if (!token) {
    return res.status(401).send({ check: false });
  }

  const appSecret = process.env.APP_SECRET;

  if (!appSecret) {
    return res.status(500).send({ error: "APP_SECRET is not defined" });
  }

  jwt.verify(token, appSecret, async (error, decoded) => {
    if (error) {
      return res.status(401).send({ check: false });
    }

    const user: { token?: string } = await usersRepository.read(decoded.id);

    return res.status(200).send({ check: true, user: user });
  });
};

export default { SignIn, SignUp, Check };
