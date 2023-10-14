import React from 'react';
import { State } from '../../types';

class Table extends React.Component {
  state: State = {
    planets: [],
    search: '',
  };

  async componentDidMount() {
    const urlAPI = 'https://swapi.dev/api/planets';

    const response = await fetch(urlAPI);
    const data = await response.json();

    this.setState({ planets: data.results });
  }

  handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { planets } = this.state;
    const { search } = this.state;

    // Verifica se o filtro está vazio
    const isFilterEmpty = search.trim() === '';

    // Filtra os dados
    const filteredPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <>
        <input
          data-testid="name-filter"
          type="text"
          id="name"
          value={ search }
          onChange={ this.handleFilterChange }
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
          {isFilterEmpty ? (
            <tbody>
              {planets.map((planet) => (
                <tr key={ planet.edited }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films.join(' ') }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {filteredPlanets.map((planet) => (
                <tr key={ planet.edited }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films.join(' ') }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </>
    );
  }
}

export default Table;
