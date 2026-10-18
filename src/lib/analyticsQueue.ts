export type AnalyticsProperties = Record<string, unknown>;

export type AnalyticsClient = {
  capture: (event: string, properties?: AnalyticsProperties) => void;
};

export type AnalyticsQueue = {
  track: (event: string, properties?: AnalyticsProperties) => void;
  /** Attach the ready client and send every queued event in order. */
  ready: (client: AnalyticsClient) => void;
  /** Analytics is unavailable (no key or the SDK failed to load); drop queued events. */
  disable: () => void;
  pending: () => number;
};

/**
 * Buffers events until the analytics SDK has loaded so components never need
 * to wait for, or bundle, the SDK. Events after `ready` go straight through.
 */
export function createAnalyticsQueue(limit = 50): AnalyticsQueue {
  let client: AnalyticsClient | null = null;
  let disabled = false;
  const queue: Array<[string, AnalyticsProperties | undefined]> = [];

  return {
    track(event, properties) {
      if (disabled) return;
      if (client) {
        client.capture(event, properties);
        return;
      }
      if (queue.length < limit) queue.push([event, properties]);
    },
    ready(nextClient) {
      if (disabled) return;
      client = nextClient;
      for (const [event, properties] of queue.splice(0)) client.capture(event, properties);
    },
    disable() {
      disabled = true;
      queue.length = 0;
    },
    pending: () => queue.length,
  };
}
