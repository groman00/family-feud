module.exports = {
  Query: {
    surveys: async (_, { }, { dataSources }) => {
      const surveys = await dataSources.surveyAPI.getAllSurveys();
      return surveys;
    },
    // launch: (_, { id }, { dataSources }) =>
    //   dataSources.launchAPI.getLaunchById({ launchId: id }),
  },
  Mutation: {
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