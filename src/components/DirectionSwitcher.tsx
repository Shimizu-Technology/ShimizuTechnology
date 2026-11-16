import { useEffect, useState } from 'react';
import { allowsDesignPreview, directions, initializeDirection, type Direction } from '../lib/designDirection';

export default function DirectionSwitcher() {
  const [selected, setSelected] = useState(document.documentElement.dataset.direction as Direction);
  useEffect(() => {
    const sync = () => { initializeDirection(); setSelected(document.documentElement.dataset.direction as Direction); };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  if (!allowsDesignPreview(location.hostname)) return null;
  const choose = (direction: Direction) => {
    const url = new URL(location.href);
    url.searchParams.set('direction', direction);
    history.pushState(null, '', url);
    document.documentElement.dataset.direction = direction;
    setSelected(direction);
  };
  return (
    <nav className="direction-switcher" aria-label="Preview design direction">
      <span>Preview</span>
      {directions.map(({ id, name }) => (
        <button key={id} type="button" aria-label={`${id.toUpperCase()}: ${name}`} aria-pressed={selected === id} onClick={() => choose(id)}>{id.toUpperCase()}</button>
      ))}
      <output aria-live="polite">{directions.find(d => d.id === selected)?.name}</output>
    </nav>
  );
}
