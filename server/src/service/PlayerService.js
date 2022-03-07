const { playerRepository } = require('../repository');

class PlayerService {
  addPlayerToGame(name, gameId) {
    return playerRepository.createWithFields({
      gameId,
      name,
    });
  }
  getPlayersByGameId(gameId) {
    return playerRepository.findAllByFields({ gameId });
  }
}

module.exports = new PlayerService();