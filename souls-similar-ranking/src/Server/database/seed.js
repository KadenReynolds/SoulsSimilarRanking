require('dotenv').config()
const db = require('./client');
const { createUser } = require('./users');


const users = [{
  user_id: 1,
  permissions: 'admin',
  username: 'kayreynolds',
  password: 'blah'
}]


const dropTables = async () => {
  try {
    console.log("Dropping Tables...")
    await db.query(`
      DROP TABLE IF EXISTS users;
      DROP TYPE IF EXISTS permission
      `)
  } catch (err) {
    throw err;
  }
}

const createTables = async () => {
  try {
    console.log("Creating Tables...")
    await db.query(`
      CREATE TYPE permission AS ENUM ('guest', 'admin');

      CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      permissions permission,
      username varchar(255),
      password varchar(255)
      )
      `)
  } catch (err) {
    throw err
  }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        user_id: user.user_id,
        permissions: user.permissions,
        username: user.username,
        password: user.password
      });
    }
    console.log('Seed User data inserted successfully.');
  } catch (err) {
    console.error('Could not seed User Data', err)
  }
}

const seedDatabase = async() => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  } 
  catch (err) {
    throw err
  }
  finally {
    db.end();
  }
}

seedDatabase();