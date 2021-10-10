module.exports = {
  Query: {
    surveys: async (_, { }, { models }) => {
      return models.Survey.findAll();
    },
    games: async (_, { }, { models }) => {
      return models.Game.findAll();
    },    
  },
  Survey: {
    answers: async (parent, args, { models }) => {
      return models.Answer.findAll({
        where: {
          surveyId: parent.id
        }
      });
    },  
  },
  Game: {},

  Mutation:  {
    createGame: async (_, {}, { models }) => {
      const game = models.Game.build({
        token: Date.now().toString()
      });
      game.save();
      
      return {
        game
      }
    }
    // createSurvey: async (_, { title }, { dataSources }) => {
      // const results = await dataSources.userAPI.bookTrips({ launchIds });

      // const launches = await dataSources.launchAPI.getLaunchesByIds({
      //   launchIds,
      // });
      // const survey = {

      // }
      // return {
      //   success: true,
      //   message: 'survey created'
      //   survey,
      // };
    // },
  },
};