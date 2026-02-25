import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center px-6">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
                            <FiAlertTriangle size={36} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h2>
                        <p className="text-slate-500 mb-8">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
                        >
                            <FiRefreshCw /> Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
