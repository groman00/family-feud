const models = require('../../database/models');

class GameService {

  getAllGames() {
    return models.Game.findAll();
  }

  async createNewGame() {
    const token = Date.now().toString();       
    const game = models.Game.build({
      token,
    });
    await game.save();

    const player = models.Player.build({
      name: 'host',
    });    
    await player.setGame(game);
    await player.save();  
    
    // Testing: Clear all games
    // models.Game.destroy({
    //   where: {},
    //   truncate: true
    // });
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