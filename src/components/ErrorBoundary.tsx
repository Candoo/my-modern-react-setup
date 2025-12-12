import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }

    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const overlay = (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#1a1a1a',
            zIndex: 9999,
            overflow: 'auto',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Close button */}
          <button
            onClick={this.resetError}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: '#999',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              lineHeight: 1,
              zIndex: 10000,
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#999')}
          >
            ✕
          </button>

          <div style={{ padding: '60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Error type badge */}
            <div
              style={{
                display: 'inline-block',
                background: '#dc2626',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px',
                textTransform: 'uppercase',
              }}
            >
              Runtime Error
            </div>

            {/* Error message */}
            <h1
              style={{
                color: '#fca5a5',
                fontSize: '28px',
                marginBottom: '24px',
                fontWeight: '600',
                lineHeight: 1.4,
              }}
            >
              {this.state.error?.message || 'An error occurred'}
            </h1>

            {/* Stack trace */}
            {this.state.errorInfo?.componentStack && (
              <div
                style={{
                  background: '#2a2a2a',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #404040',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    marginBottom: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                  }}
                >
                  Component Stack
                </div>
                <pre
                  style={{
                    color: '#d4d4d4',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    margin: 0,
                    fontFamily: 'ui-monospace, monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={this.resetError}
              style={{
                padding: '12px 24px',
                background: '#646cff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#535bf2';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#646cff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );

      return createPortal(overlay, document.body);
    }

    return this.props.children;
  }
}