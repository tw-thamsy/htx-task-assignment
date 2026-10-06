import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

async function main() {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error(`Failed to load frontend config (${response.status})`);
  }

  window.APP_CONFIG = await response.json();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void main().catch((error: unknown) => {
  createRoot(document.getElementById('root')!).render(
    <p role="alert">{error instanceof Error ? error.message : 'Failed to load frontend config'}</p>,
  );
});
