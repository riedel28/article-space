import '@/app/styles/index.css';
import './shared/config/i18n/i18n';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден. НЕ удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <ForceUpdateProvider>
            <App />
          </ForceUpdateProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
);
