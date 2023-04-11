import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { FetchFunction } from 'relay-runtime';

import { logger } from './logger';

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const fetchQuery: FetchFunction = async (
  operation,
  variables,
) => {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

export const environment = new Environment({
  network,
  store,
  log: logger,
});
