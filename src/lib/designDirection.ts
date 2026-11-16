export const directions = [
  { id: 'a', name: 'Dark rhythm' },
  { id: 'b', name: 'Soft glow' },
  { id: 'c', name: 'Ink & silver' },
] as const;
export type Direction = typeof directions[number]['id'];

// Host allowlist, not build mode: Netlify previews also use production bundles.
export function allowsDesignPreview(host: string) {
  return host === 'localhost' || host === '127.0.0.1' || host === '[::1]'
    || /^deploy-preview-\d+--shimizu-technology\.netlify\.app$/.test(host);
}
export function initializeDirection() {
  const requested = new URLSearchParams(location.search).get('direction');
  const direction = allowsDesignPreview(location.hostname) && directions.some(d => d.id === requested)
    ? requested! : 'a';
  document.documentElement.dataset.direction = direction;
}
