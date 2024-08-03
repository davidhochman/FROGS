const db = require('../db');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');

//Not related to the project... test function
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

//Insert a new user into the database (as well as user data)
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

//Retrieve user data from database using username
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

//Retrieve user data from database using userID
async function getUser(userID) {
  let connection;
  const currUserID = userID.userID; // Correctly extract userID
  console.log(currUserID);
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.users WHERE userid = :1`,
      [currUserID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(result.rows[0]);
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

//Update existing user data in the database
async function updateUser(userData, userID) {


  const { username, email, fullName, phoneNumber } = userData;
  let connection;
  try {
    connection = await db.connectToDatabase();


    if (username) {
      console.log('setting Username');
      await connection.execute(
        'UPDATE jgoldstein3.users set username = :1 where userid = :2',
        [username, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (email) {
      console.log('setting email');
      await connection.execute(
        'UPDATE jgoldstein3.users set email = :1 where userid = :2',
        [email, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (fullName) {

      await connection.execute(
        'UPDATE jgoldstein3.users set fullname = :1 where userid = :2',
        [fullName, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (phoneNumber) {

      await connection.execute(
        'UPDATE jgoldstein3.users set phonenum = :1 where userid = :2',
        [phoneNumber, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    return { success: true, message: 'Profile has been updated' };

  } catch (err) {

    if (err.errorNum === 1) {
      console.error("Unique constraint violation:", err.message);
      return { success: false, message: 'Username or email already exists.' };
    } else {
      // Other database errors
      return { success: false, message: 'update failed due to an unknown error.' }; // Generic error
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

//Books available appointment for the user 
async function bookAppointment(appID, userID) {

  let connection;
  try {
    connection = await db.connectToDatabase();


    console.log('booking appointment');
    await connection.execute(
      'UPDATE jgoldstein3.appointments set customerid = :1 where appid = :2',
      [userID, appID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.commit();


    return { success: true, message: 'Profile has been updated' };

  } catch (err) {

    if (err.errorNum === 1) {
      console.error("Unique constraint violation:", err.message);
      return { success: false, message: 'Username or email already exists.' };
    } else {
      // Other database errors
      return { success: false, message: 'update failed due to an unknown error.' }; // Generic error
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

//Retrieves all user appointment data
async function getUserApp(userID) {
  let connection;
  const currUserId = userID.userID; // Correctly extract busID
  console.log(currUserId);

  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.appointments WHERE customerid = :1`,
      [currUserId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(result.rows);
    return result.rows;
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

//Cancels an appointment from the user end
async function cancelApp(userID) {
  let connection;
  const currUserId = userID.userID; // Correctly extract busID
  console.log(currUserId);

  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `UPDATE JGOLDSTEIN3.appointments SET customerid = NULL where appid = :1`,
      [currUserId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    connection.commit();
    return { success: true, message: 'Profile has been updated' };
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

//Allows user to leave a review for a business
async function newReview(review, userID, busID, rating) {
  let connection;
  try {
    connection = await db.connectToDatabase();

    // 1. Get the maximum existing userID
    const resultMaxId = await connection.execute(
      'SELECT MAX(reviewid) FROM jgoldstein3.reviews'
    );
    const maxReviewId = resultMaxId.rows[0][0] || 0;

    // 2. Calculate the new userID
    const newReviewId = maxReviewId + 1;


    const result = await connection.execute(
      'INSERT INTO jgoldstein3.reviews (reviewid, customerid, busid, rating, review) VALUES (:1, :2, :3, :4, :5)',
      [newReviewId, userID, busID, rating, review],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    connection.commit();
    return { success: true, message: 'Profile has been updated' };
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

//Retrieves all the reviews that a user has made
async function getUserReview(userID) {
  let connection;
  const currUserId = userID.userID; // Correctly extract busID
  console.log(currUserId);

  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.reviews WHERE customerid = :1`,
      [currUserId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log(result.rows);
    return result.rows;
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
  getUser,
  updateUser,
  bookAppointment,
  getUserApp,
  cancelApp,
  newReview,
  getUserReview
};
