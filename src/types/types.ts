export type PlanetType = {
  [key: string]: any
  name: string,
  climate: string,
  created: string,
  diameter: string,
  edited: string,
  films: string[],
  gravity: string,
  orbital_period: string,
  population: string,
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
};

export type FilterType = {
  column: string,
  comparison: string,
  value: number,
};

export type OrderType = {
  column: string;
  order: 'ASC' | 'DESC'
};

export type PlanetContextType = {
  searchText: string,
  planets: PlanetType[],
  filterPlanets: PlanetType[],
  filterConfig: FilterType[];
  handleSearchText: (term: string) => void;
  handleSearchNumeric: (filter: FilterType) => void;
  removeFilter: (filter: FilterType) => void;
  removeAllFilters: () => void;
  handleOrderColumn: (filterOrder: OrderType) => void;
};

export type ContextType = {
  results: PlanetType[];
};
