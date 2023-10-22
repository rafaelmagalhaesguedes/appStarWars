import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PlanetContext } from '../../context/PlanetContext';
import { InputSearch, SearchContainer } from './Styles';

function FilterText() {
  const { handleSearchText } = useContext(PlanetContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.target.value);
  };

  return (
    <SearchContainer>
      <label htmlFor="name">
        <InputSearch
          data-testid="name-filter"
          type="text"
          name="name"
          id="name"
          onChange={ handleSearch }
        />
        <FontAwesomeIcon size="lg" className="iconSearch" icon={ faSearch } />
      </label>
    </SearchContainer>
  );
}

export default FilterText;
