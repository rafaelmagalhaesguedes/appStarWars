import FilterForm from './components/FilterForm/FilterForm';
import SearchForm from './components/SearchForm/SearchForm';
import Table from './components/Table/Table';

function App() {
  return (
    <div className="container">
      <SearchForm />
      <FilterForm />
      <Table />
    </div>
  );
}

export default App;
