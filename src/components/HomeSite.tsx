import { PostHogProvider } from 'posthog-js/react';
import App from '../App.tsx';

export default function HomeSite() {
  return (
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
      }}
    >
      <App />
    </PostHogProvider>
  );
}
