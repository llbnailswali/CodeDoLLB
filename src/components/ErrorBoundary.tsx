import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-indigo-400 text-3xl">refresh</span>
          </div>
          <h1 className="text-xl font-bold font-['Outfit'] mb-2">Something went wrong</h1>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            The application encountered a temporary error. Tap below to reload.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold font-['Outfit'] text-sm transition-all shadow-lg active:scale-95"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
