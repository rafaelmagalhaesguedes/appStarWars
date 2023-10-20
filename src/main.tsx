import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PlanetProvider from './context/PlanetProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <PlanetProvider>
        <App />
      </PlanetProvider>
    </BrowserRouter>,
  );
