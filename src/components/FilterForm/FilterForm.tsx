import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../../context/PlanetContext';
import { OrderType } from '../../types/types';

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
    filterConfig,
    removeFilter,
    removeAllFilters, setFilterPlanets, filterPlanets } = useContext(PlanetContext);
  const [filterData, setFilterData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterSort, setFilterSort] = useState<OrderType>({
    column: 'population',
    order: 'DESC',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFilterData({ ...filterData, [id]: value });
  };

  const handleChangeSort = (e: any) => {
    const { id, value, type, name } = e.target;
    if (type === 'radio') {
      setFilterSort({ ...filterSort, [name]: id });
    } else {
      setFilterSort({ ...filterSort, [name]: value });
    }
  };

  const handleSortColumn = () => {
    const sortedPlanets = [...filterPlanets];
    sortedPlanets.sort((a, b) => {
      if (a[filterSort.column] === 'unknown' && b[filterSort.column] !== 'unknown') {
        return 1;
      }
      if (a[filterSort.column] !== 'unknown' && b[filterSort.column] === 'unknown') {
        return -1;
      }
      if (filterSort.order === 'ASC') {
        return parseFloat(a[filterSort.column]) - parseFloat(b[filterSort.column]);
      }
      return parseFloat(b[filterSort.column]) - parseFloat(a[filterSort.column]);
    });
    setFilterPlanets(sortedPlanets);
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

        <input
          data-testid="value-filter"
          type="number"
          id="value"
          name="value"
          value={ filterData.value }
          onChange={ handleChange }
        />
        <button data-testid="button-filter" onClick={ handleFilter }>
          Filtrar
        </button>

        {/*
          FILTRO PARA ORDENAR
        */}
        <label htmlFor="sort">Ordenar</label>
        <select
          data-testid="column-sort"
          name="column"
          id="column-sort"
          value={ filterSort.column }
          onChange={ handleChangeSort }
        >
          {columns && columns.map((column) => (
            <option key={ column }>
              {column}
            </option>
          ))}
        </select>

        <label htmlFor="asc">Ascendente</label>
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="order"
          id="ASC"
          onChange={ handleChangeSort }
        />

        <label htmlFor="desc">Descendente</label>
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="order"
          id="DESC"
          onChange={ handleChangeSort }
        />

        <button
          data-testid="column-sort-button"
          onClick={ () => handleSortColumn() }
        >
          Ordenar
        </button>

        {/*
          REMOVER FILTERS
        */}
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
