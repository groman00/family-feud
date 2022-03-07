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
    const subscriptions = {};

    Object.keys(events).forEach(event => {
      subscriptions[event] = {
        subscribe: () => pubsub.asyncIterator([events[event]]),
      }
    });

    return subscriptions;
  }
}

module.exports = new PubSubService();