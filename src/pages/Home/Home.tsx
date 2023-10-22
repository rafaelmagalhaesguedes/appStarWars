import FilterForm from '../../components/FilterNumeric/FilterNumeric';
import SearchForm from '../../components/FilterText/FilterText';
import Table from '../../components/Table/Table';
import { Filter, Header, HomeContainer, Main } from './Styles';
import Logo from '../../assets/imgs/logo-star wars.png';
import { TableData } from '../../components/Table/Styles';

function Home() {
  return (
    <HomeContainer>
      <Header>
        <img src={ Logo } alt="#" />
      </Header>
      <Main>
        <Filter>
          <SearchForm />
          <FilterForm />
        </Filter>
        <TableData>
          <Table />
        </TableData>
      </Main>
    </HomeContainer>
  );
}

export default Home;
