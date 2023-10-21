import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PlanetProvider from './context/PlanetProvider';
import App from './App';
import { GlobalStyle } from './assets/css/GlobalStyle';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PlanetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </PlanetProvider>,
  );
