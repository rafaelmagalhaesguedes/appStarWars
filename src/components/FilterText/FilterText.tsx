import { useContext } from 'react';
import { PlanetContext } from '../../context/PlanetContext';

function FilterText() {
  const { handleSearchText } = useContext(PlanetContext);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.target.value);
  };

  return (
    <input
      data-testid="name-filter"
      type="text"
      name="name"
      id="name"
      onChange={ handleSearch }
    />
  );
}

export default FilterText;
