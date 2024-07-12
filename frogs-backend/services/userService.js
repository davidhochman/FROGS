const userDAO = require('../data-access/userDAO');

async function getAllUsers() {
  try {
    const users = await userDAO.getAllUsers();
    return users;  
  } catch (err) {
    // Log the error for debugging on the server-side
    console.error("Error in getAllUsers:", err); 

    // Throw a new error with a more general message for the client
    throw new Error('Failed to fetch users from the database.'); 
  }
}

module.exports = {
  getAllUsers,
  // Add other user-related service functions here (e.g., getUserById, createUser, updateUser, deleteUser)
};