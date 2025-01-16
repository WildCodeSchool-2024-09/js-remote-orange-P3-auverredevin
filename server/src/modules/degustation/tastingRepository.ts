import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Tasting {
  tasting_id: number;
  name: string;
  date: string;
  city_id: number;
  website_url: string;
}
class TastingRepository {
  // The C of CRUD - Create operation

  async create(tasting: Omit<Tasting, "tasting_id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into tasting (name, date, city_id, website_url) values (?, ?, ?, ?)",
      [tasting.name, tasting.date, tasting.city_id, tasting.website_url],
    );

    // Return the ID of the newly inserted tasting
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific tasting by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from tasting where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the tasting
    return rows[0] as Tasting;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all tastings from the "tasting" table
    const [rows] = await databaseClient.query<Rows>("select * from tasting");

    // Return the array of tastings
    return rows as Tasting[];
  }

  // The U of CRUD - Update operation

  // async update(tasting: Tasting) {
  //   ...
  // }

  // The D of CRUD - Delete operation

  // async delete(id: number) {
  //   ...
  // }
}

export default new TastingRepository();
