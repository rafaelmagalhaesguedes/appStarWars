import React, { useContext, useState } from 'react';
import { PlanetContext } from '../../context/planet-context';
import { FilterType } from '../../types';

function FilterForm() {
  const { handleFilterChange } = useContext(PlanetContext);

  const [formData, setFormData] = useState<FilterType>({
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

  return (
    <div>
      <select
        data-testid="column-filter"
        id="column"
        value={ formData.column }
        onChange={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
