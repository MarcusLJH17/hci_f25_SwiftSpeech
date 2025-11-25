import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FlashcardProvider } from './context/FlashcardContext';
import { ProgressProvider } from './context/ProgressContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressProvider>
      <FlashcardProvider>
        <App />
      </FlashcardProvider>
    </ProgressProvider>
  </React.StrictMode>,
);
