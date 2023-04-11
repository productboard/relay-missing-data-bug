/* eslint-disable no-console */
import type { LogEvent } from 'relay-runtime';

const eventsToIgnore = [
  'queryresource.retain',
  'network.start',
  'network.next',
  'network.error',
  'network.complete',
  'execute.complete',
];

export const logger = (logEvent: LogEvent): void => {
  if (eventsToIgnore.includes(logEvent.name)) {
  } else if (logEvent.name === 'execute.start') {
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s%c%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      `${name} `,
      'font-weight:bold',
      logEventParams.params.name,
    );
    console.log(logEventParams);
    console.groupEnd();
  } else if (logEvent.name === 'queryresource.fetch') {
    // Prints additional information about the presence/staleness of data and whether it's going to
    // be (re)fetched or not. See:
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/availability-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/presence-of-data/
    //  - https://relay.dev/docs/guided-tour/reusing-cached-data/staleness-of-data/
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      `${name} - `,
      logEventParams.operation.request.node.operation.name,
    );
    console.log(
      `- Data for the query in the cache: ${logEventParams.queryAvailability.status}`,
    );
    console.log(
      `- Network request should be send: ${
        logEventParams.shouldFetch ? 'Yes' : 'No'
      }`,
    );
    console.log(logEventParams);
    console.groupEnd();
  } else if (logEvent.name === 'suspense.fragment') {
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      `${name} - `,
      logEventParams.fragment.name,
    );
    console.log(logEventParams);
    console.groupEnd();
  } else {
    const { name, ...logEventParams } = logEvent;
    console.groupCollapsed(
      '%c%s%c%s',
      'font-weight:bold',
      '[Relay] ',
      'font-weight:normal',
      name,
    );

    console.log(logEventParams);
    console.groupEnd();
  }
}
