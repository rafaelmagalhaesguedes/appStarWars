import { useEffect, useState } from 'react';
import { PlanetContext } from './planet-context';
import { PlanetType } from '../types';

type PlanetContextProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children } : PlanetContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');

  const handleChange = (term: string) => {
    setSearch(term);
  };

  const filterPlanets = planets
    .filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    async function fetchApi() {
      const urlAPI = 'https://swapi.dev/api/planets';

      const response = await fetch(urlAPI);
      const data = await response.json();

      setPlanets(data.results);
    }
    fetchApi();
  }, []);

  const contextValues = { planets, search, handleChange, filterPlanets };

  return (
    <PlanetContext.Provider value={ contextValues }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
