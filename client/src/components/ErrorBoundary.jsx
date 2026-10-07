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
        <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 font-sans">
          <div className="bg-white border border-rose-200 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-lg space-y-5">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900">Application Exception Caught</h3>
                <p className="text-xs text-slate-500 font-sans tracking-wide">JobMax Self-Healing Diagnostic</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-rose-700 overflow-x-auto">
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
