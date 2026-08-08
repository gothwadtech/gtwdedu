import React, { useState, useEffect, ReactNode } from 'react';
import { RefreshCw, Eye, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
}

export function ErrorBoundary({ children }: Props) {
  const [state, setState] = useState<State>({
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  });

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Captured window error:', event.error);
      setState({
        hasError: true,
        error: event.error || new Error(event.message),
        errorInfo: null,
        showDetails: false,
      });
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Captured unhandled promise rejection:', event.reason);
      setState({
        hasError: true,
        error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        errorInfo: null,
        showDetails: false,
      });
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  const handleRestart = () => {
    setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
    window.location.reload();
  };

  const toggleDetails = () => {
    setState((prev) => ({ ...prev, showDetails: !prev.showDetails }));
  };

  if (state.hasError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#1A1C1E] text-gray-900 dark:text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-[#202124] rounded-3xl border border-[#E0E0E0] dark:border-[#3C4043] shadow-xl p-6 space-y-5 text-center">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-gray-100">
              Application Exception Encountered
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              An unexpected runtime error occurred while rendering the interface. You can inspect the error trace or restart the application session.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleRestart}
              className="w-full py-3 px-4 rounded-xl bg-[#0494F4] hover:bg-[#0378C6] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Restart Application Session
            </button>

            <button
              onClick={toggleDetails}
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-[#2D2F31] hover:bg-gray-200 dark:hover:bg-[#3C4043] text-gray-700 dark:text-gray-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              {state.showDetails ? 'Hide Technical Details' : 'View Error Details'}
              {state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {state.showDetails && (
            <div className="text-left bg-gray-900 text-rose-300 rounded-2xl p-4 text-[11px] font-mono overflow-x-auto max-h-48 space-y-2 border border-rose-500/20">
              <div>
                <strong>Error Message:</strong>
                <p className="mt-1 text-gray-200 break-words">{state.error?.toString() || 'Unknown runtime error'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
