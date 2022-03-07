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

      pubSubService.publishGameEvent('gameCreated', game);

      return game;
    },
    startGame: async (_, { token }) => {
      const game = await gameService.startGame(token);
      
      pubSubService.publishGameEvent('gameStarted', game);

      return game;
    },      
    joinGame: async (_, { token, playerName }) => {
      const game = await gameService.getByToken(token);
      
      await playerService.addPlayerToGame(playerName, game.id)
        
      pubSubService.publishGameEvent('playerJoined', game);
      
      return game;
    },
    revealAnswer: async (_, { answerId, token }) => {  
      await answerService.reveal(answerId);
      
      const game = await gameService.updateTurn(token);

      pubSubService.publishGameEvent('answerRevealed', game);
      
      return game;
    },  
    giveStrike: async (_, { surveyId }) => {
      const survey = await surveyService.giveStrike(surveyId)
      const game = await gameService.getById(survey.gameId);      

      pubSubService.publishGameEvent('strikeGiven', game);
      
      return game;
    }      
  },
  Subscription: pubSubService.toSubscriptions()
};