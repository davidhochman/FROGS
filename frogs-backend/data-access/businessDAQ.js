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

module.exports = {
  getAllBusinesses,
};
