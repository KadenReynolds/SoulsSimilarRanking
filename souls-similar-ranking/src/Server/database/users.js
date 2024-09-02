const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({
  permissions,
  username,
  password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows:[user] } = await db.query(`
      INSERT INTO users(
          permissions,
          username,
          password )
      VALUES($1, $2, $3)
      RETURNING *`, [
        permissions,
        username,
        hashedPassword]);
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser
}