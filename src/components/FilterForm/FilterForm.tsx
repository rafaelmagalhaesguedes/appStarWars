import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../../context/planet-context';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterForm() {
  const {
    handleSearchNumeric,
    filterConfig, removeFilter, removeAllFilters } = useContext(PlanetContext);
  const [filterData, setFilterData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFilterData({ ...filterData, [id]: value });
  };

  const handleFilter = () => {
    handleSearchNumeric(filterData);
  };

  const filterColumns = columns
    .filter((column) => !filterConfig
      .some((filter) => filter.column === column));

  useEffect(() => {
    setFilterData({
      column: columns[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [filterConfig]);

  return (
    <div className="filter_container">
      <div className="filters">
        <select
          data-testid="column-filter"
          id="column"
          value={ filterData.column }
          onChange={ handleChange }
        >
          {filterColumns.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ filterData.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          id="value"
          data-testid="value-filter"
          value={ filterData.value }
          onChange={ handleChange }
        />
        <button data-testid="button-filter" onClick={ handleFilter }>
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filter
        </button>
      </div>

      <div className="display_filters">
        {filterConfig && filterConfig.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <span><strong>{ filter.column }</strong></span>
            {': '}
            <span>{ filter.comparison }</span>
            {' '}
            <span>{ filter.value }</span>
            {' '}
            <button
              onClick={ () => removeFilter(filter) }
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterForm;
