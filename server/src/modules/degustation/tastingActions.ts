import type { RequestHandler } from "express";

// Import access to data
import tastingRepository from "./tastingRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tastings
    const tastings = await tastingRepository.readAll();

    // Respond with the tasting in JSON format
    res.json(tastings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific tasting based on the provided ID
    const tastingId = Number(req.params.id);
    const tasting = await tastingRepository.read(tastingId);

    // If the tasting is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tasting in JSON format
    if (tasting == null) {
      res.sendStatus(404);
    } else {
      res.json(tasting);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newTasting = {
      name: req.body.name,
      date: req.body.date,
      city_id: req.body.city_id,
      website_url: req.body.website_url,
    };

    const insertId = await tastingRepository.create(newTasting);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
