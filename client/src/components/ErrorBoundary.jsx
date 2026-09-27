import React from 'react';
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-900 text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="bg-dark-800 border-2 border-rose-500/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Application Exception Caught</h3>
                <p className="text-xs text-slate-400 font-mono">JobMax Self-Healing Diagnostic</p>
              </div>
            </div>

            <div className="p-3.5 bg-dark-900 rounded-xl border border-dark-700 text-xs font-mono text-rose-300 overflow-x-auto">
              {this.state.error?.toString() || "Unknown rendering exception"}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="btn-primary text-xs flex-1 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Application
              </button>
              <button
                onClick={this.handleReset}
                className="btn-secondary text-xs flex-1 flex items-center justify-center gap-2"
              >
                Reset Session State
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
