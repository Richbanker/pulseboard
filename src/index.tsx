import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './mockServer'; // пусть остаётся

createRoot(document.getElementById('root')!).render(<App />);