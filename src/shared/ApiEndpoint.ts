import { SubscriptionClient } from 'subscriptions-transport-ws';

export const graphQLUrl = `https://react.eogresources.com/graphql`;
export const socketClient = new SubscriptionClient('ws://react.eogresources.com/graphql', { reconnect: true });
