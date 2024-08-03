const userDAO = require('../data-access/userDAO');

//Test function, not relevent to the project
async function getAllUsers() {
  try {
    const users = await userDAO.getAllUsers();
    return users;  
  } catch (err) {
    // Log the error for debugging
    console.error("Error in getAllUsers:", err); 

    // Throw a new error with a more general message
    throw new Error('Failed to fetch users from the database.'); 
  }
}

module.exports = {
  getAllUsers,
};