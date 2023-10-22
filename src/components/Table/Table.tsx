import { useContext } from 'react';
import { PlanetContext } from '../../context/PlanetContext';
import { TableBody, TableHeader } from './Styles';

function Table() {
  const { planets, filterPlanets } = useContext(PlanetContext);

  const isFilterEmpty = filterPlanets && filterPlanets.length === 0;

  return (
    <table>
      <TableHeader>
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
      </TableHeader>
      <TableBody>
        {isFilterEmpty
          ? planets && planets.map((planet) => (
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
          : filterPlanets && filterPlanets.map((planet) => (
            <tr key={ planet.edited }>
              <td data-testid="planet-name">{planet.name}</td>
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
          ))}
      </TableBody>
    </table>
  );
}

export default Table;
