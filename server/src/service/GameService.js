const { gameRepository, playerRepository } = require('../repository');

class GameService {

  getAllGames() {
    return gameRepository.findAll();
  }

  async createNewGame() {
    const game = await gameRepository.createWithFields({
      token: Date.now().toString(),
    });

    // Create Host
    await playerRepository.createWithFields({
      name: 'host',
      gameId: game.id
    });
    
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
    const players = await playerRepository.findAllByFields({ gameId: game.id });

    const turns = players.filter(p => p.name !== 'host').length;
    
    await game.update({
      turn: game.turn < turns - 1 ? game.turn + 1 : 0
    });

    await game.save(); 

    return game;    
  }
}

module.exports = new GameService();