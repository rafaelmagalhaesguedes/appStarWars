import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../../context/PlanetContext';
import FilterOrder from '../FilterOrder/FilterOrder';
import {
  ButtonFilter,
  DisplayFilters, FilterContainer, Filters, InputValue, InputsFilter } from './Styles';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterNumeric() {
  const {
    handleSearchNumeric,
    filterConfig,
    removeFilter,
    removeAllFilters,
  } = useContext(PlanetContext);

  const [filterData, setFilterData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFilterData({ ...filterData, [id]: value });
  };

  const handleFilter = () => {
    handleSearchNumeric(filterData);
  };

  const filterColumns = columns.filter((column) => {
    if (filterConfig) {
      return !filterConfig.some((filter) => filter.column === column);
    }
    return true;
  });

  useEffect(() => {
    setFilterData({
      column: columns[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [filterConfig]);

  return (
    <FilterContainer>
      <Filters>
        <InputsFilter>
          <label htmlFor="column">Coluna</label>
          <select
            data-testid="column-filter"
            id="column"
            name="column-comparison"
            value={ filterData.column }
            onChange={ handleChange }
          >
            {filterColumns.map((column) => (
              <option key={ column } value={ column }>
                {column}
              </option>
            ))}
          </select>
        </InputsFilter>
        <InputsFilter>
          <label htmlFor="comparison">Operador</label>
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            value={ filterData.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </InputsFilter>

        <InputValue
          data-testid="value-filter"
          type="number"
          id="value"
          name="value"
          value={ filterData.value }
          onChange={ handleChange }
        />

        <ButtonFilter
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          FILTRAR
        </ButtonFilter>

        <ButtonFilter
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          REMOVER
        </ButtonFilter>
        <FilterOrder />
      </Filters>

      <DisplayFilters>
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
      </DisplayFilters>
    </FilterContainer>
  );
}

export default FilterNumeric;
