const { getUserByUsername } = require('../data-access/userDAO');

async function loginUser(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
        throw new Error('Invalid username or password');
    }

    return { user };
}

module.exports = {
    loginUser
};