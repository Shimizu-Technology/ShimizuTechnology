import { PostHogProvider } from 'posthog-js/react';
import App from '../App.tsx';
import WorkPage from './WorkPage.tsx';

export default function HomeSite() {
  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      }}
    >
      {window.location.pathname.replace(/\/$/, '') === '/work' ? <WorkPage /> : <App />}
    </PostHogProvider>
  );
}
