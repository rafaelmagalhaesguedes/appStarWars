import { createContext } from 'react';
import { FilterType, PlanetType } from '../types';

type PlanetContextType = {
  planets: PlanetType[],
  search: string
  filterPlanets: PlanetType[],
  filterConfig: FilterType[];
  handleSearch: (term: string) => void;
  handleFilterChange: (filter: FilterType) => void;
};

export const PlanetContext = createContext({} as PlanetContextType);
