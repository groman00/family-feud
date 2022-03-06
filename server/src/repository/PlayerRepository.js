const BaseRepository = require("./BaseRepository");
const models = require('../../database/models');

class PlayerRepository extends BaseRepository {
  
  constructor() {
    super(models.Player);
  }  
}

module.exports = new PlayerRepository();