import './App.css';
import FilterForm from './components/FilterForm/FilterForm';
import SearchForm from './components/SearchForm/SearchForm';
import Table from './components/Table/Table';

function App() {
  return (
    <>
      <div>Hello, App!</div>
      <SearchForm />
      <FilterForm />
      <Table />
    </>
  );
}

export default App;
