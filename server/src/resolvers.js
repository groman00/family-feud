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
    answers: async (survey) => {
      return models.Answer.findAll({
        where: {
          surveyId: survey.id
        }
      });
    },  
  },
  Game: {
    players: async (game) => {
      return models.Player.findAll({
        where: {
          gameId: game.id
        }
      });
    },   
    survey: async (game) => {
      return models.Survey.findOne({
        where: {
          gameId: game.id
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
    // revealAnswer: async (_, { token, playerName, answerId }) => {
      // const game = await models.Game.findOne({
      //   where: {
      //     token
      //   }
      // });
      // const player = models.Player.build({
      //   name: playerName,
      // });    
      // await player.setGame(game);
      // await player.save();   
        
      // pubsub.publish('ANSWER_REVEALED', { answerRevealed: game });
      
      // return { game };
    // },    
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
    answerRevealed: {
      subscribe: () => pubsub.asyncIterator(['ANSWER_REVEALED']),
    },        
  },  
});