const { DataSource } = require('apollo-datasource');

class SurveyDataSource extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  surveyReducer(survey) {
    return {
      id: survey.id,
      title: survey.title,
      totalResponses: survey.totalResponses,
      responses: [],
    };
  }

  async getAllSurveys() {
    const response = [
      {
        id: 123,
        title: "Hello World Survey!",
        totalResponses: 10,
      }
    ];
    return response.map(response => this.surveyReducer(response));
  }
}

module.exports = SurveyDataSource;

