module.exports = {
  Query: {
    surveys: async (_, { }, { models }) => {
      // const surveys =  await dataSources.surveyAPI.getAllSurveys();
      // return surveys;
      return models.Survey.findAll();
      // console.log(models);
      return [];
    },
    // launch: (_, { id }, { dataSources }) =>
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
  },
  // Survey: {
  //   responses: async (parent, { }, { dataSources }) => {      
  //     const surveyResponses =  await dataSources.surveyAPI.getSurveyResponses(parent.id);
  //     return surveyResponses;
  //   }
  // }  

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