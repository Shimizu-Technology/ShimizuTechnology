import { Component, type ErrorInfo, type ReactNode } from 'react';

type HomeSiteErrorBoundaryProps = {
  children: ReactNode;
};

type HomeSiteErrorBoundaryState = {
  hasError: boolean;
};

export default class HomeSiteErrorBoundary extends Component<
  HomeSiteErrorBoundaryProps,
  HomeSiteErrorBoundaryState
> {
  state: HomeSiteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): HomeSiteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('The Shimizu Technology site failed to load.', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-[#07101f] px-5 text-center text-white">
        <div role="alert" className="max-w-lg">
          <p className="font-mono-label text-xs text-blue-300">Connection interrupted</p>
          <h1 className="mt-4 text-4xl font-bold">We couldn’t load the site.</h1>
          <p className="mt-5 leading-relaxed text-slate-300">
            Check your connection and try again. Your request was not submitted.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-md bg-blue-500 px-5 py-3 font-semibold hover:bg-blue-400"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <a
              href="/"
              className="rounded-md border border-white/20 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Return Home
            </a>
          </div>
        </div>
      </main>
    );
  }
}
