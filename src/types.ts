export type PlanetType = {
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

export type PlanetContextType = {
  planets: PlanetType[];
};
