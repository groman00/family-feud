const { answerService, gameService } = require('./service');

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
      
      // Testing: Clear all games
      // models.Game.destroy({
      //   where: {},
      //   truncate: true
      // });

      pubsub.publish('GAME_CREATED', { gameCreated: game });

      return game;
    },
    startGame: async (_, { token }) => {
      const game = await models.Game.findOne({
        where: {
          token
        }
      });

      const players = await models.Player.findAll({
        where: {
          gameId: game.id,
        }
      });
      
      // Assume 1 player is the host.
      if (players.length === 1) {
        throw('No Players')
        return;
      }

      const testSurveyId = 1;
      await models.Survey.update({ 
        gameId: game.id,
        strikes: 0,
      },
      {
        // Forcing every game to attach survey 1.
        where: {            
          id: testSurveyId
        }
      });

      await models.Answer.update({
        revealed: false
      }, {
        where: {            
          surveyId: testSurveyId
        }
      });

      pubsub.publish('GAME_STARTED', { gameStarted: game });

      return game;
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
      
      return game;
    },
    revealAnswer: async (_, { answerId, token }) => {  
      await answerService.reveal(answerId);
      
      const game = await gameService.updateTurn(token);

      pubsub.publish('ANSWER_REVEALED', { answerRevealed: game });
      
      return game;
    },  
    giveStrike: async (_, { surveyId }) => {
      const survey = await models.Survey.findOne({
        where: {
          id: surveyId
        }
      });

      if (survey.strikes < 3) {
        await survey.update({
          strikes: survey.strikes + 1
        });
        await survey.save();
      }
      
      const game = await models.Game.findOne({
        where: {
          id: survey.gameId
        }
      });      

      pubsub.publish('STRIKE_GIVEN', { strikeGiven: game });      
      
      return game;
    }      
  },
  Subscription: {
    gameCreated: {
      subscribe: () => pubsub.asyncIterator(['GAME_CREATED']),
    },
    gameStarted: {
      subscribe: () => pubsub.asyncIterator(['GAME_STARTED']),
    },
    playerJoined: {
      subscribe: () => pubsub.asyncIterator(['PLAYER_JOINED']),
    },   
    answerRevealed: {
      subscribe: () => pubsub.asyncIterator(['ANSWER_REVEALED']),
    },   
    strikeGiven: {
      subscribe: () => pubsub.asyncIterator(['STRIKE_GIVEN']),
    },            
  },  
});