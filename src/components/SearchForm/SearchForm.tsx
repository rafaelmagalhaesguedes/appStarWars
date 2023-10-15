import { useContext } from 'react';
import { PlanetContext } from '../../context/planet-context';

function SearchForm() {
  const { search, handleSearch } = useContext(PlanetContext);
  return (
    <input
      data-testid="name-filter"
      type="text"
      id="name"
      value={ search }
      onChange={ ({ target }) => handleSearch(target.value) }
    />
  );
}

export default SearchForm;
