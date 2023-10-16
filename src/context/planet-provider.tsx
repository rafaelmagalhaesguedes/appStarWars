import { useCallback, useEffect, useState } from 'react';
import { PlanetContext } from './planet-context';
import { PlanetType } from '../types';

type PlanetContextProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children } : PlanetContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');
  const [filterPlanets, setFilterPlanets] = useState<PlanetType[]>([]);

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  const handleFilterSearch = useCallback(() => {
    const filter = planets
      .filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));
    if (filter) {
      setFilterPlanets(filter);
    }
  }, [planets, search]);

  useEffect(() => {
    handleFilterSearch();
  }, [handleFilterSearch]);

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
    <PlanetContext.Provider value={ { planets, search, handleSearch, filterPlanets } }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
