import { useContext } from 'react';
import { PlanetContext } from '../../context/planet-context';

function SearchForm() {
  const { handleSearchText } = useContext(PlanetContext);
  return (
    <input
      data-testid="name-filter"
      type="text"
      id="name"
      onChange={ ({ target }) => handleSearchText(target.value) }
    />
  );
}

export default SearchForm;
