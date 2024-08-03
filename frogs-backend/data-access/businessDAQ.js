//Business Data Access
const db = require('../db');
const oracledb = require('oracledb');

//Retrieves all businesses from the database
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

//Instantiate business objects in each table of the database when a new business acc is creates
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

//Retrieve business data from the database by the users username
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

//Get a users business data using their userID
async function getBusiness(userID) {
  let connection;
  const currUserID = userID.userID; // Correctly extract userID
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.businessdata WHERE userid = :1`,
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

//Get business data user a users business ID
async function getBusinessBusid(busID) {
  let connection;
  const currBusId = busID.busID; // Correctly extract userID
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.businessdata WHERE busid = :1`,
      [currBusId],
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

//Get a businesses appointment data using their business ID
async function getApp(busID) {
  let connection;
  const currBusId = busID.busID; // Correctly extract busID
  console.log(currBusId);

  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.appointments WHERE busid = :1`,
      [currBusId],
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

//Insert new booking data into the database for a business
async function createBooking(formData, busID) {
  let connection;
  console.log(formData);
  console.log(busID);
  const { price, startTime, endTime, date } = formData;

  try {
    connection = await db.connectToDatabase();

    // 1. Get the maximum existing appid
    const resultMaxId = await connection.execute(
      'SELECT MAX(appid) FROM jgoldstein3.appointments'
    );
    const maxAppId = resultMaxId.rows[0][0] || 0;
    console.log("Maximum app ID found:", maxAppId);

    // 2. Calculate the new appid
    const newAppId = maxAppId + 1;
    console.log("New App ID:", newAppId);

    const result = await connection.execute(
      'INSERT INTO jgoldstein3.appointments (appid, busid, price, starttime, endtime, appdate) VALUES (:1, :2, :3, :4, :5, :6)', 
      [newAppId, busID, price, startTime, endTime, date],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.commit();

    return { success: true, message: 'Booking has been created' };
  } catch (err) {
    console.error('Error creating booking:', err);
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

//Delete an appointment using appointment ID
async function deleteApp(appID) {
  let connection;
  const currAppId = appID.appID; // Correctly extract userID
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `delete FROM JGOLDSTEIN3.appointments WHERE appid = :1`,
      [currAppId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.commit();
    return { success: true, message: 'Business Account created successfully!'}; // Return the new business data
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

//Get all reviews for a business using the business ID
async function getReview(busID) {
  let connection;
  const currBusId = busID.busID; // Correctly extract busID
  console.log(currBusId);

  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.reviews WHERE busid = :1`,
      [currBusId],
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

//Insert or update a new response from the business owner 
async function updateReview(reviewID, reply) {
  let connection;
  const currReviewID = reviewID; // Correctly extract busID
  const newReply = reply;
  console.log(currReviewID);

   try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `UPDATE JGOLDSTEIN3.reviews SET RESPONSE = :1 WHERE reviewid = :2`,
      [newReply, currReviewID],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.commit();
    return { success: true, message: 'Review has been updated' };
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

//Get business metric data from database using business ID
async function getMetrics(busID) {
  let connection;
  const currBusID = busID.busID; // Correctly extract userID
  console.log(currBusID);
  try {
      connection = await db.connectToDatabase();
      const result = await connection.execute(
          `SELECT * FROM JGOLDSTEIN3.businessmetrics WHERE busid = :1`,  
          [currBusID],
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

//Not related to project...test function
async function getBusinesses() {
  let connection;
  try {
    connection = await db.connectToDatabase();
    const result = await connection.execute(
      `SELECT * FROM JGOLDSTEIN3.businessdata`
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
  getAllBusinesses,
  createBusiness,
  getBusinessByUsername,
  getBusiness,
  getApp,
  createBooking,
  deleteApp,
  getReview,
  updateReview,
  getMetrics,
  getBusinesses,
  getBusinessBusid
};
