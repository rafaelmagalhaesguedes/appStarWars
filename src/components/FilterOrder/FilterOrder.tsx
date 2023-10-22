import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../../context/PlanetContext';
import { OrderType } from '../../types/types';
import { FilterOrderContainer, InputsBox, InputsRadius } from './Styles';
import { ButtonFilter, InputsFilter } from '../FilterNumeric/Styles';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterOrder() {
  const {
    handleOrderColumn,
  } = useContext(PlanetContext);

  const [filterOrder, setFilterOrder] = useState<OrderType>({
    column: 'population',
    order: 'DESC',
  });

  const handleChangeOrder = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value, type, name } = e.target;
    if (type === 'radio') {
      setFilterOrder({ ...filterOrder, [name]: id });
    } else {
      setFilterOrder({ ...filterOrder, [name]: value });
    }
  };

  const handleOrder = () => {
    handleOrderColumn(filterOrder);
  };

  useEffect(() => {
    setFilterOrder({
      column: 'population',
      order: 'DESC',
    });
  }, []);

  return (
    <FilterOrderContainer>
      <InputsFilter>
        <label htmlFor="sort">Ordenar</label>
        <select
          data-testid="column-sort"
          name="column"
          id="column"
          onChange={ handleChangeOrder }
        >
          {columns && columns.map((column) => (
            <option key={ column }>
              {column}
            </option>
          ))}
        </select>
      </InputsFilter>

      <InputsRadius>
        <InputsBox>
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="order"
            id="ASC"
            onChange={ handleChangeOrder }
          />
          <label htmlFor="ASC">Ascendente</label>

        </InputsBox>

        <InputsBox>
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="order"
            id="DESC"
            onChange={ handleChangeOrder }
          />
          <label htmlFor="DESC">Descendente</label>
        </InputsBox>
      </InputsRadius>

      <ButtonFilter
        data-testid="column-sort-button"
        onClick={ () => handleOrder() }
      >
        ORDENAR
      </ButtonFilter>
    </FilterOrderContainer>
  );
}

export default FilterOrder;
