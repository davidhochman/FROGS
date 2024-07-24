const db = require('../db'); 
const oracledb = require('oracledb'); 
const bcrypt = require('bcrypt');

async function getAllUsers() {
  let connection;
  try {
    connection = await db.connectToDatabase(); 
    const result = await connection.execute(
      'SELECT * FROM jgoldstein3.users',  
      [],  
      { outFormat: oracledb.OUT_FORMAT_OBJECT } 
      `SELECT * FROM JGOLDSTEIN3.users`,  
      [],  
      { outFormat: oracledb.OUT_FORMAT_OBJECT } 
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

    

    // 1. Get the maximum existing userID
    const resultMaxId = await connection.execute(
      'SELECT MAX(userid) FROM jgoldstein3.users'
    );
    const maxUserId = resultMaxId.rows[0][0] || 0;

    // 2. Calculate the new userID
    const newUserId = maxUserId + 1;

    // 3. Insert the new user with the calculated ID
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await connection.execute(
      'INSERT INTO jgoldstein3.users (userid, username, password, usertype, email, fullname, phonenum) VALUES (:1, :2, :3, :4, :5, :6, :7)', 
      [newUserId, username, hashedPassword, userType, email, fullName, phoneNumber]
    );

    await connection.commit();

    return { success: true, message: 'Account created successfully!', userID: newUserId }; // Success message

  } catch (error) {

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
  let connection;
  try {
      connection = await db.connectToDatabase();
      const result = await connection.execute(
          `SELECT * FROM JGOLDSTEIN3.users WHERE username = :1`,  
          [username],
          { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return result.rows[0];  
  } catch (err) {
      console.error('Error fetching user:', err);
      return null;
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
  getAllUsers,
  createUser,
  getUserByUsername,
};
