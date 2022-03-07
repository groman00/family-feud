const { 
  answerService, 
  gameService, 
  playerService,
  pubSubService, 
  surveyService
} = require('./service');

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

      pubSubService.publish('GAME_CREATED', { gameCreated: game });

      return game;
    },
    startGame: async (_, { token }) => {
      const game = await gameService.startGame(token);
      
      pubSubService.publish('GAME_STARTED', { gameStarted: game });

      return game;
    },      
    joinGame: async (_, { token, playerName }) => {
      const game = await gameService.getByToken(token);
      
      await playerService.addPlayerToGame(playerName, game.id)
        
      pubSubService.publish('PLAYER_JOINED', { playerJoined: game });
      
      return game;
    },
    revealAnswer: async (_, { answerId, token }) => {  
      await answerService.reveal(answerId);
      
      const game = await gameService.updateTurn(token);

      pubSubService.publish('ANSWER_REVEALED', { answerRevealed: game });
      
      return game;
    },  
    giveStrike: async (_, { surveyId }) => {
      const survey = await surveyService.giveStrike(surveyId)
      const game = await gameService.getById(survey.gameId);      

      pubSubService.publish('STRIKE_GIVEN', { strikeGiven: game });      
      
      return game;
    }      
  },
  Subscription: {
    gameCreated: {
      subscribe: () => pubSubService.subscribe('GAME_CREATED'),
    },
    gameStarted: {
      subscribe: () => pubSubService.subscribe('GAME_STARTED'),
    },
    playerJoined: {
      subscribe: () => pubSubService.subscribe('PLAYER_JOINED'),
    },   
    answerRevealed: {
      subscribe: () => pubSubService.subscribe('ANSWER_REVEALED'),
    },   
    strikeGiven: {
      subscribe: () => pubSubService.subscribe('STRIKE_GIVEN'),
    },            
  },  
};