import { useEffect, useState, useCallback } from 'react';
import { PlanetContext } from './planet-context';
import { FilterType, PlanetType } from '../types';

type PlanetContextProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');
  const [filterPlanets, setFilterPlanets] = useState<PlanetType[]>(planets);
  const [filterConfig, setFilterConfig] = useState<FilterType[]>([]);

  // Carrega o termo de pesquisa
  const handleSearch = (term: string) => {
    setSearch(term);
  };

  // Filtra de acordo com o termo
  const handleFilterSearch = useCallback(() => {
    const filtered = planets
      .filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));

    setFilterPlanets(filtered);
  }, [planets, search]);

  // Carrega o filtro a cada interação
  useEffect(() => {
    handleFilterSearch();
  }, [handleFilterSearch]);

  // Carrega os dados da comparação
  const handleFilterChange = (filter: FilterType) => {
    setFilterConfig([...filterConfig, filter]);
  };

  // Filtra os dados por comparação
  const applyFilter = useCallback(() => {
    let filtered = planets;
    filterConfig.forEach(({ comparison, column, value }) => {
      filtered = filtered.filter((planet) => {
        const planetValue = parseFloat(planet[column]);
        const valueFilter = Number(value);

        if (comparison === 'maior que') {
          return planetValue > valueFilter;
        }
        if (comparison === 'menor que') {
          return planetValue < valueFilter;
        }
        if (comparison === 'igual a') {
          return planetValue === valueFilter;
        }
        return true;
      });
    });
    setFilterPlanets(filtered);
  }, [planets, filterConfig]);

  // Carrega o filtro a cada interação
  useEffect(() => {
    applyFilter();
  }, [applyFilter, filterConfig]);

  // Carrega os dados da API
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
    <PlanetContext.Provider
      value={ {
        planets,
        search,
        handleSearch,
        filterPlanets,
        handleFilterChange,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
