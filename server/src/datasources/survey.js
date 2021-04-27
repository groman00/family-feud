const { DataSource } = require('apollo-datasource');
const {} = require('../store');

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

  surveyReducer({ id, title, totalResponses, responses }) {
    return {
      id,
      title,
      totalResponses,
      responses,
    };
  }

  async getAllSurveys() {
    console.log(this.store);
    // const response = [
    //   {
    //     id: 123,
    //     title: "Hello World Survey!",
    //     totalResponses: 10,
    //   }
    // ];
    // return response.map(response => this.surveyReducer(response));

  }

  async getSurveyResponses(surveyId) {
    const surveyResponse = {
      surveyId: 123,
      id: 1,
      text: "This is the first response",
      count: 12,
      rank: 1,
    };
    // return response.map(response => this.surveyReducer(response));
    // return this.surveyResponseReducer(surveyResponse);    
    return [surveyResponse];
  }
}

module.exports = SurveyDataSource;

