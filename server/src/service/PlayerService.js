const { playerRepository } = require('../repository');

class PlayerService {
  addPlayerToGame(name, gameId) {
    return playerRepository.createWithFields({
      gameId,
      name,
    });
  }

  createHost(gameId) {
    return playerRepository.createWithFields({
      name: 'host',
      gameId,
    });
  }

  getPlayersByGameId(gameId) {
    return playerRepository.findAllByFields({ gameId });
  }
}

module.exports = new PlayerService();