//Business Data Access
const db = require('../db');
const oracledb = require('oracledb');

async function getAllBusinesses() {
  let connection;
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      'SELECT * FROM JGOLDSTEIN3.BusinessData biz',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching business data :', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

async function createBusiness(userID) {
  const currUserID = userID.userID; // Correctly extract userID
  let connection;
  try {
    connection = await db.connectToDatabase(); // Use parentheses for function call
    console.log("Attempting to create a new business for user:", currUserID);

    // 1. Get the maximum existing busID
    const resultMaxId = await connection.execute(
      'SELECT MAX(busid) FROM jgoldstein3.businessdata'
    );
    const maxBusId = resultMaxId.rows[0][0] || 0;
    console.log("Maximum Business ID found:", maxBusId);

    // 2. Calculate the new busID
    const newBusId = maxBusId + 1;
    console.log("New Business ID:", newBusId);

    // 3. Insert the new business
    const result = await connection.execute(
      'INSERT INTO jgoldstein3.businessdata (busid, userid) VALUES (:1, :2)', // Use RETURNING for debugging
      [newBusId, currUserID],
    );

    await connection.commit();

    // 1. Get the maximum existing busID
    const resultMaxId2 = await connection.execute(
      'SELECT MAX(metricid) FROM jgoldstein3.businessmetrics'
    );
    const maxMetId = resultMaxId2.rows[0][0] || 0;
    console.log("Maximum Metric ID found:", maxBusId);

    // 2. Calculate the new busID
    const newMetId = maxMetId + 1;
    console.log("New Business ID:", newMetId);

    // 3. Insert the new business
    await connection.execute(
      'INSERT INTO jgoldstein3.businessmetrics (metricid, busid) VALUES (:1, :2)', // Use RETURNING for debugging
      [newMetId, newBusId],
    );

    await connection.commit();
    
    return { success: true, message: 'Business Account created successfully!', businessData: result.rows[0] }; // Return the new business data

  } catch (error) {
    console.error('Error creating business:', error);
    if (error.errorNum === 1) { // Check for unique constraint violation
      return { success: false, message: 'A business with this User ID already exists' };
    } else {
      return { success: false, message: 'Business registration failed due to an unknown error' };
    }
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

async function getBusinessByUsername(username) {
  let connection;
  try {
    connection = await db.connectToDatabase();

    // 1. Fetch User ID based on Username
    const userResult = await connection.execute(
      `SELECT userid FROM JGOLDSTEIN3.users WHERE username = :1`,
      [username],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (userResult.rows.length === 0) {
      console.warn(`User with username '${username}' not found`);
      return null;
    }

    const userId = userResult.rows[0].USERID;
    console.log("Fetched user ID:", userId);

    // 2. Fetch Business Data using User ID
    const businessResult = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.businessdata WHERE userid = :1`,
      [userId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (businessResult.rows.length > 0) {
        console.log("Business data fetched:", businessResult.rows[0])
      return businessResult.rows[0]; // Return the business object
    } else {
      console.warn(`Business data not found for user with username '${username}'`);
      return null; // Return null if business data not found
    }
  } catch (err) {
    console.error('Error fetching business:', err);
    return null; // Handle potential database errors
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}



module.exports = {
  getAllBusinesses,
  createBusiness,
  getBusinessByUsername
};
