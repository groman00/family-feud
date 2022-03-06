const { answerService, gameService, playerService } = require('./service');

module.exports = (models, pubsub) => ({
  Query: {
    surveys: async () => {
      return models.Survey.findAll();
    },
    games: async () => {
      return gameService.getAllGames();
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
      return playerService.getPlayersByGameId(game.id);
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
      const game = await gameService.createNewGame();

      pubsub.publish('GAME_CREATED', { gameCreated: game });

      return game;
    },
    startGame: async (_, { token }) => {
      const game = await gameService.getByToken(token);
      const players = await playerService.getPlayersByGameId(game.id);
      
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

      answerService.revealBySurveyId(testSurveyId, false);
      
      pubsub.publish('GAME_STARTED', { gameStarted: game });

      return game;
    },      
    joinGame: async (_, { token, playerName }) => {
      const game = await gameService.getByToken(token);
      
      await playerService.addPlayerToGame(playerName, game.id)
        
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
      
      const game = await gameService.getById(survey.gameId);      

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