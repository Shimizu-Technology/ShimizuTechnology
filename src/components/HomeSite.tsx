import App from '../App.tsx';
import WorkPage from './WorkPage.tsx';

export default function HomeSite() {
  return window.location.pathname.replace(/\/$/, '') === '/work' ? <WorkPage /> : <App />;
}
