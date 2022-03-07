const BaseRepository = require("./BaseRepository");
const models = require('../../database/models');

module.exports = {
  answerRepository: new BaseRepository(models.Answer),
  gameRepository: new BaseRepository(models.Game),
  playerRepository: new BaseRepository(models.Player),
  surveyRepository: new BaseRepository(models.Survey),
};
