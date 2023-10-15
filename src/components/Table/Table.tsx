import React, { useState, useEffect } from 'react';
import { PlanetType } from '../../types';

function Table() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchApi() {
      const urlAPI = 'https://swapi.dev/api/planets';

      const response = await fetch(urlAPI);
      const data = await response.json();

      setPlanets(data.results);
    }

    fetchApi();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterPlanets = planets
    .filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));

  const isFilterEmpty = search === '';

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        id="name"
        value={ search }
        onChange={ handleFilterChange }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {isFilterEmpty ? (
            planets.map((planet) => (
              <tr key={ planet.edited }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.join(' ')}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          ) : (
            filterPlanets.map((planet) => (
              <tr key={ planet.edited }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.join(' ')}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
