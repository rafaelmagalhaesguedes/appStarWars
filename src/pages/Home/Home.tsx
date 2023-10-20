import FilterForm from '../../components/FilterNumeric/FilterNumeric';
import SearchForm from '../../components/FilterText/FilterText';
import Table from '../../components/Table/Table';

function Home() {
  return (
    <div className="container">
      <SearchForm />
      <FilterForm />
      <Table />
    </div>
  );
}

export default Home;
