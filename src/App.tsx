import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { BrokenComponent } from './components/BrokenComponent'

const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('💥 Component render error!')
  }
  return <div style={{ color: '#4ade80' }}>✅ Component working fine</div>
}

function App() {
  const [count, setCount] = useState(0)
  const [throwRenderError, setThrowRenderError] = useState(false)
  const [errorKey, setErrorKey] = useState(0)

  const throwRuntimeError = () => {
    throw new Error('💥 Runtime error from event handler!')
  }

  const resetComponent = () => {
    setThrowRenderError(false)
    setErrorKey(k => k + 1)
  }

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
      <h1>Vite + React</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <BrokenComponent></BrokenComponent>

      <div className="card">
        <h2>Test Error Handling</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Render Error (Error Boundary)</h3>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            Dev: Shows in console | Production: Error Boundary catches it
          </p>
          
          {/* Pass onReset callback and key to remount when needed */}
          <ErrorBoundary key={errorKey} onReset={resetComponent}>
            <BuggyComponent shouldThrow={throwRenderError} />
          </ErrorBoundary>
          
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => setThrowRenderError(true)}>
              Trigger Render Error
            </button>
            <button onClick={resetComponent} style={{ marginLeft: '10px' }}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Runtime Error</h3>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            Appears in browser console (not overlay)
          </p>
          <button onClick={throwRuntimeError}>
            Throw Runtime Error
          </button>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App