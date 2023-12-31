import { useEffect, useState, useCallback } from 'react';
import { PlanetContext } from './PlanetContext';
import { FilterType, OrderType, PlanetType } from '../types/types';

type PlanetContextProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetContextProps) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterPlanets, setFilterPlanets] = useState<PlanetType[]>([]);
  const [filterConfig, setFilterConfig] = useState<FilterType[]>([]);

  /*
  // TEXTUAL SEARCH FILTER
  */
  const handleSearchText = (term: string) => {
    setSearchText(term);
  };

  const handleFilterSearch = useCallback(() => {
    const filtered = planets
      .filter((planet) => planet.name.toLowerCase().includes(searchText.toLowerCase()));

    setFilterPlanets(filtered);
  }, [planets, searchText]);

  useEffect(() => {
    handleFilterSearch();
  }, [handleFilterSearch]);

  /*
  // NUMERIC SEARCH FILTER
  */
  const handleSearchNumeric = (filter: FilterType) => {
    setFilterConfig([...filterConfig, filter]);
  };

  const handleFilterNumeric = useCallback(() => {
    const filteredPlanets = planets.filter((planet) => {
      return filterConfig.reduce((match, filter) => {
        if (!match) return false;
        const planetValue = parseFloat(planet[filter.column]);
        const valueFilter = Number(filter.value);

        if (filter.comparison === 'maior que') {
          return planetValue > valueFilter;
        }
        if (filter.comparison === 'menor que') {
          return planetValue < valueFilter;
        }
        if (filter.comparison === 'igual a') {
          return planetValue === valueFilter;
        }

        return true;
      }, true);
    });

    setFilterPlanets(filteredPlanets);
  }, [planets, filterConfig]);

  useEffect(() => {
    handleFilterNumeric();
  }, [handleFilterNumeric, filterConfig, planets]);

  /*
  // REMOVE FILTER
  */
  const removeFilter = (filterToRemove: FilterType) => {
    const updatedFilters = filterConfig
      .filter((filter) => filter !== filterToRemove);
    setFilterConfig(updatedFilters);
  };

  const removeAllFilters = () => {
    setFilterConfig([]);
  };

  /*
  // ORDER FILTER
  */
  const handleOrderColumn = (filterSort: OrderType) => {
    const sortedPlanets = [...filterPlanets];
    const { column, order } = filterSort;
    sortedPlanets.sort((a, b) => {
      if (a[column] === 'unknown' && b[column] !== 'unknown') {
        return 1;
      }
      if (a[column] !== 'unknown' && b[column] === 'unknown') {
        return -1;
      }
      if (order === 'ASC') {
        return parseFloat(a[column]) - parseFloat(b[column]);
      }
      return parseFloat(b[column]) - parseFloat(a[column]);
    });
    setFilterPlanets(sortedPlanets);
  };

  /*
  // CONNECT API
  */
  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching data!', error);
      }
    }
    fetchApi();
  }, []);

  return (
    <PlanetContext.Provider
      value={ {
        planets,
        searchText,
        filterPlanets,
        filterConfig,
        handleSearchText,
        handleSearchNumeric,
        handleOrderColumn,
        removeFilter,
        removeAllFilters,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
