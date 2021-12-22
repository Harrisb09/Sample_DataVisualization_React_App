import React from 'react';
import { Provider, createClient, subscriptionExchange, defaultExchanges } from 'urql';
import Metrics from '../Features/Metrics/Metrics';
import { graphQLUrl, socketClient } from '../shared/ApiEndpoint';

const client = createClient({
  url: graphQLUrl,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => socketClient.request(operation),
    }),
  ],
});

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};
