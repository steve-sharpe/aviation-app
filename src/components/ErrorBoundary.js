import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.error}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || 'An error occurred.'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  error: {
    padding: '20px',
    color: 'white',
    backgroundColor: '#d9534f',
    textAlign: 'center',
  },
};

export default ErrorBoundary;
