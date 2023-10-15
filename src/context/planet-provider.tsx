import { useEffect, useState } from 'react';
import { PlanetContext } from './planet-context';
import { PlanetType } from '../types';

type PlanetContextProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children } : PlanetContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const urlAPI = 'https://swapi.dev/api/planets';

      const response = await fetch(urlAPI);
      const data = await response.json();

      setPlanets(data.results);
    }
    fetchApi();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets } }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
