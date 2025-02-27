import type { RequestHandler } from "express";

// Import access to data
import answersRepository from "./answersRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const answers = await answersRepository.readAll();

    // Respond with the items in JSON format
    res.json(answers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const answersId = Number(req.params.id);
    const answers = await answersRepository.read(answersId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (answers == null) {
      res.sendStatus(404);
    } else {
      res.json(answers);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newAnswers = {
      answer_id: req.body.answer_id,
      question_id: req.body.question_id,
      answer_text: req.body.answer_text,
      score_value: req.body.score_value,
    };

    // Create the item
    const insertId = await answersRepository.create(newAnswers);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const answersId = Number(req.params.id);
    const updatedAnswers = {
      answer_id: answersId,
      question_id: req.body.question_id,
      answer_text: req.body.answer_text,
      score_value: req.body.score_value,
    };
    await answersRepository.update(updatedAnswers);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation
const deleteAnswer: RequestHandler = async (req, res, next) => {
  try {
    const answersId = Number(req.params.id);
    await answersRepository.delete(answersId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Fetch answers by question ID
const readByQuestionId: RequestHandler = async (req, res, next) => {
  try {
    const questionId = Number(req.params.questionId);
    const answers = await answersRepository.readByQuestionId(questionId);
    res.json(answers);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, deleteAnswer, readByQuestionId };
