const { gameRepository } = require('../repository');
const answerService = require('./AnswerService');
const playerService = require('./PlayerService');
const surveyService = require('./SurveyService');

class GameService {

  getAllGames() {
    return gameRepository.findAll();
  }

  async createNewGame() {
    const game = await gameRepository.createWithFields({
      token: Date.now().toString(),
    });
    
    await playerService.createHost(game.id);
    
    return game;
  }

  getByToken(token) {
    return gameRepository.findOneByFields({ token });
  }

  getById(id) {
    return gameRepository.findOneByFields({ id });
  }

  async updateTurn(token) {
    const game = await gameRepository.findOneByFields({ token });

    // Todo: Figure out count or findAndCountAll()
    const players = await playerService.getPlayersByGameId(game.id);
    
    const turns = players.filter(p => p.name !== 'host').length;
    
    await game.update({
      turn: game.turn < turns - 1 ? game.turn + 1 : 0
    });

    await game.save(); 

    return game;    
  }

  async startGame(token) {
    const game = await this.getByToken(token);
    const players = await playerService.getPlayersByGameId(game.id);
    
    // Assume 1 player is the host.
    if (players.length === 1) {
      throw('No Players')
    }

    const testSurveyId = 1;

    await surveyService.setGame(testSurveyId, game.id)
    await answerService.revealBySurveyId(testSurveyId, false);

    return game;
  }
}

module.exports = new GameService();