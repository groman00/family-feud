const { PubSub } = require('graphql-subscriptions');

// Todo: Use Enum
const events = {
  gameCreated: 'GAME_CREATED',
  gameStarted: 'GAME_STARTED',
  playerJoined: 'PLAYER_JOINED',
  answerRevealed: 'ANSWER_REVEALED',
  strikeGiven: 'STRIKE_GIVEN',
};

const pubsub = new PubSub();

class PubSubService {

  publishGameEvent(eventKey, game) {
    pubsub.publish(events[eventKey], { [eventKey]: game });
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