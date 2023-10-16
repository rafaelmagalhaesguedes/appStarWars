import { useContext } from 'react';
import { PlanetContext } from '../../context/planet-context';

function SearchForm() {
  const { handleSearch } = useContext(PlanetContext);
  return (
    <input
      data-testid="name-filter"
      type="text"
      id="name"
      onChange={ ({ target }) => handleSearch(target.value) }
    />
  );
}

export default SearchForm;
