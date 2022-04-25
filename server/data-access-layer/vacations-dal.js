import connection from "../common/database.js";

let vacationsResult = {
  success: false,
  data: null,
};

const getAll = async () => {
  try {
    let getAllResult = await connection
      .promise()
      .query("SELECT * FROM vacations");
    vacationsResult.success = true;
    vacationsResult.data = getAllResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const getVacationById = async (vacationId) => {
  try {
    let getVacationResult = await connection
      .promise()
      .query(`SELECT * FROM vacations WHERE id = ${vacationId}`);
    vacationsResult.success = true;
    vacationsResult.data = getVacationResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const getAllFollowers = async () => {
  try {
    let followersResult = await connection.promise()
      .query(`SELECT vacationId, userId, COUNT(userId) AS followers  FROM users_vacations
        GROUP BY vacationId`);
    vacationsResult.success = true;
    vacationsResult.data = followersResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const anddNewVacation = async (newVacation) => {
  try {
    let postResult = await connection.promise()
      .query(`INSERT INTO vacations (destination, description, image, price, startDate, endDate, followers)
        VALUES
         ("${newVacation.destination}", "${newVacation.description}","${newVacation.image}","${newVacation.price}", "${newVacation.startDate}", "${newVacation.endDate}",  "0")`);
    vacationsResult.success = true;
    vacationsResult.data = postResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const addNewFollowerToDB = async (userId, vacationId) => {
  try {
    let postFollowerResult = await connection.promise()
      .query(`INSERT INTO users_vacations (userId, vacationId)
      VALUES
       ('${userId}', '${vacationId}')`);
    vacationsResult.success = true;
    vacationsResult.data = postFollowerResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const update = async (id, vacationToUpdate) => {
  try {
    const result = await connection.promise().query(
      `UPDATE vacations SET destination=?, description=?, image=?, price=?, startDate=?, endDate=?
      WHERE id = ${id}`,
      [
        vacationToUpdate.destination,
        vacationToUpdate.description,
        vacationToUpdate.image,
        vacationToUpdate.price,
        vacationToUpdate.startDate,
        vacationToUpdate.endDate,
      ]
    );
    vacationsResult.success = true;
    vacationsResult.data = result[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

const deleteVacation = async (vacationId) => {
  try {
    let deleteResult = await connection
      .promise()
      .query(`DELETE FROM vacations WHERE id = ${vacationId}`);
    vacationsResult.success = true;
    vacationsResult.data = deleteResult[0];
  } catch (error) {
    vacationsResult.data = error;
  }
  return vacationsResult;
};

export default {
  getAll,
  getVacationById,
  anddNewVacation,
  deleteVacation,
  getAllFollowers,
  addNewFollowerToDB,
  update,
};
