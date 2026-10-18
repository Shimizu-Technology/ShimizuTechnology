import { expect, test } from '@playwright/test';
import { createAnalyticsQueue, type AnalyticsProperties } from '../src/lib/analyticsQueue';

function fakeClient() {
  const sent: Array<[string, AnalyticsProperties | undefined]> = [];
  return { sent, client: { capture: (event: string, properties?: AnalyticsProperties) => { sent.push([event, properties]); } } };
}

test('queues events until the client is ready, then flushes them in order', () => {
  const queue = createAnalyticsQueue();
  const { sent, client } = fakeClient();
  queue.track('page_viewed', { page: 'homepage' });
  queue.track('contact_email_clicked');
  expect(queue.pending()).toBe(2);
  expect(sent).toEqual([]);

  queue.ready(client);
  expect(sent).toEqual([['page_viewed', { page: 'homepage' }], ['contact_email_clicked', undefined]]);
  expect(queue.pending()).toBe(0);

  queue.track('project_link_clicked', { project_title: 'Marianas Open', url: 'https://marianasopen.com' });
  expect(sent.at(-1)).toEqual(['project_link_clicked', { project_title: 'Marianas Open', url: 'https://marianasopen.com' }]);
});

test('caps the queue and drops events when analytics is unavailable', () => {
  const queue = createAnalyticsQueue(3);
  for (let index = 0; index < 5; index += 1) queue.track('page_viewed', { index });
  expect(queue.pending()).toBe(3);

  queue.disable();
  expect(queue.pending()).toBe(0);
  const { sent, client } = fakeClient();
  queue.ready(client);
  queue.track('contact_phone_clicked');
  expect(sent).toEqual([]);
});
