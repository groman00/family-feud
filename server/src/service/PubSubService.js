const { PubSub } = require('graphql-subscriptions');


// gameCreated: {
//   subscribe: () => pubsub.asyncIterator(['GAME_CREATED']),
// },
// gameStarted: {
//   subscribe: () => pubsub.asyncIterator(['GAME_STARTED']),
// },
// playerJoined: {
//   subscribe: () => pubsub.asyncIterator(['PLAYER_JOINED']),
// },   
// answerRevealed: {
//   subscribe: () => pubsub.asyncIterator(['ANSWER_REVEALED']),
// },   
// strikeGiven: {
//   subscribe: () => pubsub.asyncIterator(['STRIKE_GIVEN']),

const pubsub = new PubSub();

class PubSubService {

  publish(event, obj) {
    pubsub.publish(event, obj);
  }

  subscribe(event) {
    return pubsub.asyncIterator([event]);
  }
}

module.exports = new PubSubService();