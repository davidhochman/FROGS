const db = require('../db');
const oracledb = require('oracledb');

//Update or insert new profile data for business dashboard
async function updateProfile(userData, userID, busID) {


  const { username, email, fullName, phoneNumber, businessName, address, profileDescription } = userData;
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

    if (businessName) {
      console.log(businessName);
      await connection.execute(
        'UPDATE jgoldstein3.businessdata set busname = :1 where userid = :2',
        [businessName, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (address) {

      console.log(address);
      await connection.execute(
        'UPDATE jgoldstein3.businessdata set address = :1 where userid = :2',
        [address, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (profileDescription) {
      console.log(profileDescription);
      await connection.execute(
        'update jgoldstein3.businessdata set prfdesc = :1 where userid = :2',
        [profileDescription, userID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      console.log('made it to other side');
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

//Update booking data for an existing booking
async function updateBooking(userData, appID) {


  const { price, startTime, endTime, date } = userData;
  let connection;
  try {
    connection = await db.connectToDatabase();


    if (price) {
      console.log(price);
      await connection.execute(
        'UPDATE jgoldstein3.appointments set price = :1 where appid = :2',
        [price, appID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (startTime) {
      console.log('setting email');
      await connection.execute(
        'UPDATE jgoldstein3.appointments set starttime = :1 where appid = :2',
        [startTime, appID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (endTime) {

      await connection.execute(
        'UPDATE jgoldstein3.appointments set endtime = :1 where appid = :2',
        [endTime, appID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    if (date) {

      await connection.execute(
        'UPDATE jgoldstein3.appointments set appdate = :1 where appid = :2',
        [date, appID],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      await connection.commit();

    }

    return { success: true, message: 'Booking has been updated' };

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


module.exports = {
  updateProfile,
  updateBooking
};

