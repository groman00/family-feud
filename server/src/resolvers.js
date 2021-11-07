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
  Game: {},

  Mutation:  {
    createGame: async () => {
      const game = models.Game.build({
        token: Date.now().toString()
      });

      // Testing: Clear all games
      // models.Game.destroy({
      //   where: {},
      //   truncate: true
      // });

      game.save();
      
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
      console.log(token, playerName, game);
      return { game };
    }
  },
  Subscription: {
    gameCreated: {
      subscribe: () => pubsub.asyncIterator(['GAME_CREATED']),
    },
  },  
});