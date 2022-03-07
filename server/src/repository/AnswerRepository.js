const BaseRepository = require("./BaseRepository");
const models = require('../../database/models');

class AnswerRepository extends BaseRepository {
  
  constructor() {
    super(models.Answer);
  }  
}

module.exports = new AnswerRepository();