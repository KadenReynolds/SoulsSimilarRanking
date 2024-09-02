const db = require('./client')

const createBoss = async ({name, description, boss_image, game_id, game_rank, overall_rank, lore, annoyance, difficulty, entertainment, level, appearence}) => {
  const ladela = await (lore + difficulty + entertainment + level + appearence) - annoyance
  try {
    const {rows:[boss]} = await db.query(`
      INSERT INTO bosses(
        name,
        description,
        boss_image,
        game_id,
        game_rank,
        overall_rank, 
        lore, 
        annoyance, 
        difficulty, 
        entertainment, 
        level, 
        appearence, 
        ladela )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`, [
        name,
        description,
        boss_image,
        game_id,
        game_rank,
        overall_rank, 
        lore, 
        annoyance, 
        difficulty, 
        entertainment, 
        level, 
        appearence, 
        ladela
      ]);
    return boss;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createBoss
}