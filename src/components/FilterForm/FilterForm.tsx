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
  const { handleFilterChange, filterConfig } = useContext(PlanetContext);
  const [formData, setFormData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFilter = () => {
    handleFilterChange(formData);
  };

  useEffect(() => {
    setFormData({
      column: columns[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [filterConfig]);

  return (
    <div>
      <select
        data-testid="column-filter"
        id="column"
        value={ formData.column }
        onChange={ handleChange }
      >
        {columns.filter((column) => !filterConfig
          .some((filter) => filter.column === column))
          .map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
      </select>

      <select
        data-testid="comparison-filter"
        id="comparison"
        value={ formData.comparison }
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
        value={ formData.value }
        onChange={ handleChange }
      />
      <button data-testid="button-filter" onClick={ handleFilter }>
        Filtrar
      </button>
    </div>
  );
}

export default FilterForm;
