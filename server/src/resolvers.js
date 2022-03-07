const { PubSub } = require('graphql-subscriptions');
const { 
  answerService, 
  gameService, 
  playerService, 
  surveyService
} = require('./service');

const pubsub = new PubSub();

module.exports = {
  Query: {
    surveys: async () => 
      surveyService.findAll(),
    games: async () => 
      gameService.getAllGames(),    
  },
  Survey: {
    answers: async (survey) => 
      answerService.getBySurveyId(survey.id),  
  },
  Game: {
    players: async (game) => 
      playerService.getPlayersByGameId(game.id),   
    survey: async (game) => 
      surveyService.getByGameId(game.id),  
  },

  Mutation:  {
    createGame: async () => {
      const game = await gameService.createNewGame();

      pubsub.publish('GAME_CREATED', { gameCreated: game });

      return game;
    },
    startGame: async (_, { token }) => {
      const game = await gameService.startGame(token);
      
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
      const survey = await surveyService.getById(surveyId);

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
};