import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';
import App from './App.tsx';


const showErrorOverlay = (event: ErrorEvent | PromiseRejectionEvent) => {
  const ErrorOverlay = customElements.get('vite-error-overlay');
  
  if (!ErrorOverlay) return;

  const error = (event instanceof ErrorEvent) 
    ? event.error 
    : (event as PromiseRejectionEvent).reason;

  console.error(error); 

  const overlay = new (ErrorOverlay as any)(error);
  
  requestAnimationFrame(() => {
    document.body.appendChild(overlay);
  });
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', showErrorOverlay);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);