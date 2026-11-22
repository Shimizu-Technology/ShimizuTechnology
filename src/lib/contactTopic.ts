export const CONTACT_TOPICS = [
  'Websites & Online Presence',
  'Business Software',
  'Integrations & Automation',
  'Mobile Applications',
  'Practical AI',
  'Ongoing Support',
  'Not sure yet',
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

const TOPIC_EVENT = 'shimizu:contact-topic';

export function resolveContactTopic(raw: string | null | undefined): ContactTopic | '' {
  if (!raw) return '';
  const normalized = raw.trim().toLowerCase();
  const exact = CONTACT_TOPICS.find((t) => t.toLowerCase() === normalized);
  if (exact) return exact;
  if (normalized.includes('web')) return 'Websites & Online Presence';
  if (normalized.includes('software') || normalized.includes('payroll')) return 'Business Software';
  if (normalized.includes('integrat') || normalized.includes('auto')) return 'Integrations & Automation';
  if (normalized.includes('mobile') || normalized.includes('app')) return 'Mobile Applications';
  if (normalized === 'ai' || normalized.includes('practical ai')) return 'Practical AI';
  if (normalized.includes('support') || normalized.includes('retainer') || normalized.includes('ongoing')) return 'Ongoing Support';
  return '';
}

export function selectContactTopic(topic: ContactTopic) {
  window.dispatchEvent(new CustomEvent<ContactTopic>(TOPIC_EVENT, { detail: topic }));
}

export function onContactTopicSelected(handler: (topic: ContactTopic) => void) {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<ContactTopic>;
    if (custom.detail) handler(custom.detail);
  };
  window.addEventListener(TOPIC_EVENT, listener);
  return () => window.removeEventListener(TOPIC_EVENT, listener);
}
