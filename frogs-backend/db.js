const oracledb = require('oracledb');
require('dotenv').config(); 

async function connectToDatabase() {
    try {
        console.log('Attempting to connect to Oracle DB...');
        console.log('Credentials:', {
            user: process.env.ORACLE_USER,
            connectString: process.env.ORACLE_CONNECTSTRING,
        });

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
