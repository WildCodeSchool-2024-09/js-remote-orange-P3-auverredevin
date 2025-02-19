import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Answer {
  answer_id: number;
  question_id: number;
  answer_text: string;
  score_value: number;
}
class answersRepository {
  // The C of CRUD - Create operation

  async create(answers: Omit<Answer, "answer_id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO answers (question_id, answer_text, score_value) VALUES (?, ?, ?)",
      [answers.question_id, answers.answer_text, answers.score_value],
    );

    // Return the ID of the newly inserted answers
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific answers by its ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM answers WHERE answer_id = ?",
      [id],
    );

    // Return the first row of the result, which represents the answers
    return rows[0] as Answer;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM answers");

    // Return the array of items
    return rows as Answer[];
  }

  async readByQuestionId(questionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM answers WHERE question_id = ?",
      [questionId],
    );
    return rows as Answer[];
  }

  // The U of CRUD - Update operation
  async update(answers: Answer) {
    await databaseClient.query<Result>(
      "UPDATE answers SET question_id = ?, answer_text = ?, score_value = ? WHERE answer_id = ?",
      [
        answers.question_id,
        answers.answer_text,
        answers.score_value,
        answers.answer_id,
      ],
    );
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    await databaseClient.query<Result>(
      "DELETE FROM answers WHERE answer_id = ?",
      [id],
    );
  }
}

export default new answersRepository();
