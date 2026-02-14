import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#20b2aa', marginBottom: '10px' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#666' }}>
            Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
