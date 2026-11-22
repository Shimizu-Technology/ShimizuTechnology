import { createAnalyticsQueue, type AnalyticsProperties } from './analyticsQueue';

const queue = createAnalyticsQueue();
let started = false;

export function track(event: string, properties?: AnalyticsProperties) {
  queue.track(event, properties);
}

function whenIdleAfterLoad(callback: () => void) {
  const schedule = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(callback, { timeout: 3000 });
    else setTimeout(callback, 1500);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
}

/**
 * Loads PostHog after the page has loaded and the main thread is idle, keeping
 * the SDK off the critical path. Uses the same key and host configuration the
 * site used with PostHogProvider.
 */
export function initAnalytics() {
  if (started) return;
  started = true;
  const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    queue.disable();
    return;
  }
  whenIdleAfterLoad(() => {
    import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(apiKey, { api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST });
        queue.ready(posthog);
      })
      .catch(() => queue.disable());
  });
}
