// Todo: AnswerRepository
const models = require('../../database/models');

class AnswerService {

  reveal (id) {
    return models.Answer.update({
      revealed: true
    }, {
      where: {
        id
      }
    });    
  }
}

module.exports = new AnswerService();