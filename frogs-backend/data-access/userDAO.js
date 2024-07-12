const db = require('../db'); // Import your database connection module
const oracledb = require('oracledb'); // Import the OracleDB driver

async function getAllUsers() {
  let connection;
  try {
    connection = await db.connectToDatabase(); // Get a database connection
    const result = await connection.execute(
      'SELECT * FROM users',  // Your SQL query to fetch all users
      [],  // Bind parameters (not needed in this case)
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return data as JavaScript objects
    );
    return result.rows;  // Return the array of user objects
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err; // Rethrow the error for handling in the service layer
  } finally {
    if (connection) {
      try {
        await connection.close(); // Close the database connection when done
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = {
  getAllUsers,
  // Add more functions for other database operations (e.g., getUserById, createUser, etc.)
};