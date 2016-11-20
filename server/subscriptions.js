import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { schema } from './index';

// the default PubSub is based on EventEmitters. It can easily
// be replaced with one different one, e.g. Redis
const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
});
export { subscriptionManager, pubsub };
