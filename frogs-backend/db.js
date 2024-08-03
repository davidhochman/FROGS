const oracledb = require('oracledb');
require('dotenv').config(); 


//Takes the login credentials from the env file to establish connection
async function connectToDatabase() {
    try {
     
        const connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CONNECTSTRING,
        });

        console.log('Connected to Oracle DB successfully!');
        return connection;

    } catch (err) {
        console.error('Error connecting to Oracle DB:', err);
        throw err; 
    }
}

module.exports = { connectToDatabase };
