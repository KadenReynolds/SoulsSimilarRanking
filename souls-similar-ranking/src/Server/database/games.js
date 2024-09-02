const db = require('./client')

const createGame = async ({name, description, build_played, game_image}) => {
  try {
    const {rows:[game]} = await db.query(`
      INSERT INTO games(
        name,
        description,
        build_played,
        game_image )
      VALUES($1, $2, $3, $4)
      RETURNING *`, [
        name,
        description,
        build_played,
        game_image
      ]);
    return game;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createGame
}