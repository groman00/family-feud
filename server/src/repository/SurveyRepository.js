const BaseRepository = require("./BaseRepository");
const models = require('../../database/models');

class SurveyRepository extends BaseRepository {
  
  constructor() {
    super(models.Survey);
  }  
}

module.exports = new SurveyRepository();