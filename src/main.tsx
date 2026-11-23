import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './styles/globals.css';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('No se encontró el contenedor de GEOPREDICT.');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
