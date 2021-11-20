module.exports = (models, pubsub) => ({
  Query: {
    surveys: async () => {
      return models.Survey.findAll();
    },
    games: async () => {
      return models.Game.findAll();
    },    
  },
  Survey: {
    answers: async (parent) => {
      return models.Answer.findAll({
        where: {
          surveyId: parent.id
        }
      });
    },  
  },
  Game: {
    players: async (parent) => {
      return models.Player.findAll({
        where: {
          gameId: parent.id
        }
      });
    },   
    survey: async (parent) => {
      return models.Survey.findOne({
        where: {
          gameId: parent.id
        }
      });
    },  
  },

  Mutation:  {
    createGame: async () => {
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
      
      await models.Survey.update(
        { gameId: game.id},
        {
          where: {
            id: 1
          }
        }
      );

      // Testing: Clear all games
      // models.Game.destroy({
      //   where: {},
      //   truncate: true
      // });

      pubsub.publish('GAME_CREATED', { gameCreated: game });

      return {
        game
      }
    },
    joinGame: async (_, { token, playerName }) => {
      const game = await models.Game.findOne({
        where: {
          token
        }
      });
      const player = models.Player.build({
        name: playerName,
      });    
      await player.setGame(game);
      await player.save();   
        
      pubsub.publish('PLAYER_JOINED', { playerJoined: game });
      
      return { game };
    },
    // submitAnswer: async (_, { answerId, gameId }) => {

    // }
  },
  Subscription: {
    gameCreated: {
      subscribe: () => pubsub.asyncIterator(['GAME_CREATED']),
    },
    playerJoined: {
      subscribe: () => pubsub.asyncIterator(['PLAYER_JOINED']),
    },    
  },  
});