const { gameRepository } = require('../repository');
const models = require('../../database/models'); // Todo: Remove models.

class GameService {

  getAllGames() {
    return gameRepository.findAll();
  }

  async createNewGame() {
    const game = await gameRepository.createWithFields({
      token: Date.now().toString(),
    });
    const player = models.Player.build({
      name: 'host',
    });    

    await player.setGame(game);
    await player.save();  
    
    return game;
  }

  getByToken(token) {
    return gameRepository.findOneByFields({ token });
  }

  async updateTurn(token) {
    const game = await models.Game.findOne({
      where: {
        token
      }
    });  

    // Todo: Figure out count or findAndCountAll()
    const players = await models.Player.findAll({
      where: {
        gameId: game.id,
        // Todo: Figure out { ne: value }
        // name: {
        //   ne: 'host'
        // }
      }
    });

    const turns = players.filter(p => p.name !== 'host').length;
    
    await game.update({
      turn: game.turn < turns - 1 ? game.turn + 1 : 0
    });

    await game.save(); 

    return game;    
  }
}

module.exports = new GameService();