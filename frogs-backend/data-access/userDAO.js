const db = require('../db'); // Import database connection module
const oracledb = require('oracledb'); // Import the OracleDB driver
const bcrypt = require('bcrypt');

async function getAllUsers() {
  let connection;
  try {
    connection = await db.connectToDatabase(); 
    const result = await connection.execute(
      'SELECT * FROM jgoldstein3.users',  
      [],  
      { outFormat: oracledb.OUT_FORMAT_OBJECT } 
      'SELECT * FROM JGOLDSTEIN3.users',  // Your SQL query to fetch all users
      [],  // Bind parameters (not needed in this case)
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return data as JavaScript objects
    );
    return result.rows;  
  } catch (err) {
    console.error('Error fetching users:', err);
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

async function createUser(userData) {
  const { username, password, userType, email, fullName, phoneNumber } = userData;
  const saltRounds = 10;

  let connection;
  try {
    connection = await db.connectToDatabase();

    console.log("Attempting to create a new user...");
    console.log("Received user data:", userData);

    // 1. Get the maximum existing userID
    const resultMaxId = await connection.execute(
      'SELECT MAX(userid) FROM jgoldstein3.users'
    );
    const maxUserId = resultMaxId.rows[0][0] || 0;
    console.log("Maximum User ID found:", maxUserId);

    // 2. Calculate the new userID
    const newUserId = maxUserId + 1;
    console.log("New User ID:", newUserId);

    // 3. Insert the new user with the calculated ID
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password created");

    await connection.execute(
      'INSERT INTO jgoldstein3.users (userid, username, password, usertype, email, fullname, phonenum) VALUES (:1, :2, :3, :4, :5, :6, :7)', 
      [newUserId, username, hashedPassword, userType, email, fullName, phoneNumber]
    );

    await connection.commit();
    console.log("User successfully inserted into database");

    return { success: true, message: 'Account created successfully!' }; // Success message

  } catch (error) {
    console.error('Error registering user:', error);

    // Check for unique constraint violation 
    if (error.errorNum === 1) {
      console.error("Unique constraint violation:", error.message);
      return { success: false, message: 'Username or email already exists.' };
    } else {
      // Other database errors
      return { success: false, message: 'Registration failed due to an unknown error.' }; // Generic error
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



async function getUserByUsername(username) {
  // Fetch user from database 
  const result = await db.query(
      'SELECT * FROM jgoldstein3.users WHERE username = $1',
      [username]
  );

  return result.rows[0]; // Return the user if found, otherwise null
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
};
