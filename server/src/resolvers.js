module.exports = {
  Query: {
    surveys: async (_, { }, { models }) => {
      return models.Survey.findAll();
    },
    // launch: (_, { id }, { dataSources }) =>
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
  },
  Survey: {
  //   responses: async (parent, { }, { dataSources }) => {      
  //     const surveyResponses =  await dataSources.surveyAPI.getSurveyResponses(parent.id);
  //     return surveyResponses;
  //   }
    answers: async (parent, args, { models }) => {
      return models.Answer.findAll({
        where: {
          surveyId: parent.id
        }
      });
    },  
  }  

  // Mutation:  {
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
  // },
};