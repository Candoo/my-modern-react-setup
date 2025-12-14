import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { CardBlock, CardContent } from './components/Card'
import { useApiStatus } from './hooks/useFetchStatus';

const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('💥 Component render error!')
  }
  return <div style={{ color: '#4ade80' }}>✅ Component working fine</div>
}

function App() {
  const [count, setCount] = useState(0)
  const [throwRenderError, setThrowRenderError] = useState(false)
  const [handledError, setHandledError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0)

  // 1. HANDLED Runtime Error (Uses try...catch)
  const throwHandledError = () => {
    try {
      if (count % 2 === 0) {
        throw new Error('💥 Handled: Thrown and caught by try...catch!');
      } else {
        alert('Handled action successful!');
      }
    } catch (err) {
      console.error('Handled Error Log:', err);
      setHandledError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  }

  // 2. UNHANDLED Runtime Error (Crashes the component / Shows Vite Overlay)
  // This function is outside try...catch and will crash the app.
  const throwUnhandledError = () => {
    throw new Error('🛑 UNHANDLED: This throws an error that crashes the component tree!');
  }

  const resetComponent = () => {
    setThrowRenderError(false)
    setHandledError(null);
    setErrorKey(k => k + 1)
  }

  const { data, isLoading, isError, error } = useApiStatus();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Behind the Lens</h1>

      <CardBlock title='API Connection Status'>
        <CardContent>
          {isLoading && <p>Connecting to API...</p>}
          
          {isError && (
            <p style={{ color: 'red' }}>
              Error connecting to API: {error.message}. <br/> 
              Check Docker Compose network (is the UI using 'http://api:8080'?)
            </p>
          )}

          {data && (
            <p style={{ color: '#4ade80' }}>
              ✅ Status: {`${data.service} ${data.message}` || 'Success'}
            </p>
          )}
        </CardContent>
      </CardBlock>

      <CardBlock title='Test HMR'>
        <CardContent>
          <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        </CardContent>
      </CardBlock>

      <CardBlock title='Test Error Handling'>
        <CardContent title='1. Render Error (Boundary Test)'>
          {/* --- 1. RENDER ERROR (Caught by Error Boundary) --- */}

          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            *Triggers a render-time crash. Caught by the ErrorBoundary.*
          </p>
          
          <ErrorBoundary key={errorKey} onReset={resetComponent}>
            <BuggyComponent shouldThrow={throwRenderError} />
          </ErrorBoundary>
          
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setThrowRenderError(true)}>
              Trigger Render Error
            </button>
          </div>
        </CardContent>
        <CardContent title='2. Runtime Error (Handled)'>
          {/* --- 2. RUNTIME ERROR (Handled) --- */}
          
          {handledError && (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              Handled Error: {handledError}
            </p>
          )}
          
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            *Caught by try...catch. Does not crash the app.*
          </p>
          <button onClick={throwHandledError}>
            Trigger Handled Error
          </button>
        </CardContent>
        <CardContent title='3. Runtime Error (UNHANDLED)'>
          {/* --- 3. RUNTIME ERROR (UNHANDLED) --- */}

          <p style={{ fontSize: '12px', color: 'yellow', fontWeight: 'bold', marginBottom: '10px' }}>
            *WARNING: This will crash the component tree and show the Vite error overlay.*
          </p>
          <button onClick={throwUnhandledError}>
            Trigger Unhandled Error
          </button>
        </CardContent>
        {/* Universal Reset button */}
        <div style={{ marginTop: '20px' }}>
            <button onClick={resetComponent}>
              Reset All Errors
            </button>
        </div>
      </CardBlock>
    </>
  )
}

export default App