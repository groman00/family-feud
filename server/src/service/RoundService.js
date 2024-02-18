const { roundRepository } = require('../repository');

class RoundService {
 
  getByGameId(gameId) {
    return roundRepository.findAllByFields({ gameId });
  }
}

module.exports = new RoundService();