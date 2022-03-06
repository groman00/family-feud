const { playerRepository } = require('../repository');

class PlayerService {
  async getPlayersByGameId(gameId) {
    return await playerRepository.findAllByFields({ gameId });
  }

}

module.exports = new PlayerService();