const { PubSub } = require('graphql-subscriptions');

const events = {
  gameCreated: 'GAME_CREATED',
  gameStarted: 'GAME_STARTED',
  playerJoined: 'PLAYER_JOINED',
  answerRevealed: 'ANSWER_REVEALED',
  strikeGiven: 'STRIKE_GIVEN',
};

const pubsub = new PubSub();

class PubSubService {

  publish(event, obj) {
    pubsub.publish(event, obj);
  }

  toSubscriptions() {
    return Object
      .keys(events)
      .reduce((accumulator, eventKey) => ({
        ...accumulator,
        [eventKey]: {
          subscribe: () => pubsub.asyncIterator([events[eventKey]]),
        }
      }), {});

  }
}

module.exports = new PubSubService();