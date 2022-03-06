const { playerRepository } = require('../repository');

class PlayerService {
  async addPlayerToGame(name, gameId) {
    return playerRepository.createWithFields({
      gameId,
      name,
    });
  }
  async getPlayersByGameId(gameId) {
    return await playerRepository.findAllByFields({ gameId });
  }
}

module.exports = new PlayerService();