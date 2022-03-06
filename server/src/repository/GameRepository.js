const models = require('../../database/models');
const BaseRepository = require('./BaseRepository');

class GameRepository extends BaseRepository {
  
  constructor() {
    super(models.Game);
  }
}

module.exports = new GameRepository();