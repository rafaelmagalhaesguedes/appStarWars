import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterNumeric from '../components/FilterNumeric/FilterNumeric';
import userEvent from '@testing-library/user-event'
import Provider from '../context/PlanetProvider';
import Table from '../components/Table/Table';
import App from '../App';
import { vi } from 'vitest';
import mock from './mock';
import FilterText from '../components/FilterText/FilterText';
import FilterOrder from '../components/FilterOrder/FilterOrder';

describe('Tests component Table', () => {

  const mockFetching = {
    json: async () => mock,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(mockFetching);

  test('Verifica conexão e renderização da tabela', async () => {
    render(
      <Provider>
        <Table />
      </Provider>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const columnName = screen.getByText('Name');
    const columnRotation = screen.getByText('Rotation');
    expect(columnName).toBeInTheDocument();
    expect(columnRotation).toBeInTheDocument();
    await screen.findByText('Tatooine');
    await screen.findByText('Alderaan');
  });

  test('Verifica se o header da tabela é renderizada', () => {
    render(
      <Provider>
        <Table />
      </Provider>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rotation')).toBeInTheDocument();
  });
});

describe('Tests component FilterText', () => {
  test('Verifica se o filtro de texto renderiza corretamente', () => {
    render(<FilterText />);
    const inputElement = screen.getByTestId('name-filter');
    expect(inputElement).toBeInTheDocument();
  });

  test('Verifica se o filtro de texto funciona corretamente', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const inputElement = screen.getByTestId('name-filter');
    fireEvent.change(inputElement, { target: { value: 'Tatooine' } });
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    await userEvent.click(filterButton);

    const namePlanet = screen.getByText('Tatooine');
    expect(namePlanet).toBeInTheDocument();
  });
});

describe('Tests components Filter', () => {

  test('Verifica se o component renderiza corretamente', () => {
    render(
      <Provider>
        <FilterNumeric />
      </Provider>
    );
  
    const columnLabel = screen.getByText('Coluna');
    const ascendantLabel = screen.getByText('Ascendente');
    const descendantLabel = screen.getByText('Descendente');
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    const removeButton = screen.getByRole('button', { name: 'Remover Filter' });
  
    expect(columnLabel).toBeInTheDocument();
    expect(ascendantLabel).toBeInTheDocument();
    expect(descendantLabel).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  test('Verifica se o form renderiza com os valores iniciais corretos', () => {
    render(
      <Provider>
        <FilterNumeric />
      </Provider>
    );
    expect(screen.getByTestId('column-filter')).toHaveValue('population');
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    expect(screen.getByTestId('value-filter')).toHaveValue(0);
  });

  test('Verifica se atualiza os dados do formulário', () => {
    render(
      <Provider>
        <FilterNumeric />
      </Provider>
    );
    
    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'orbital_period' } });
    expect(screen.getByTestId('column-filter')).toHaveValue('orbital_period');

    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'menor que' } });
    expect(screen.getByTestId('comparison-filter')).toHaveValue('menor que');

    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '100' } });
    expect(screen.getByTestId('value-filter')).toHaveValue(100);
  }); 

  test('Verifica se a remoção de filtros funciona corretamente', async () => {
    render(
    <Provider>
      <FilterNumeric />
    </Provider>
    );
    const buttonRemove = screen.getByTestId('button-remove-filters');
    expect(buttonRemove).toBeInTheDocument();

    await userEvent.click(buttonRemove);
    const buttonFilter = screen.getByTestId('button-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectOrder = screen.getByTestId('column-sort');

    await userEvent.selectOptions(selectComparison, 'maior que');
    await userEvent.selectOptions(selectOrder, 'population');
    await userEvent.click(buttonFilter);
    await userEvent.selectOptions(selectComparison, 'menor que');
    await userEvent.click(buttonFilter);
    await userEvent.selectOptions(selectComparison, 'igual a');
    await userEvent.click(buttonFilter);

    const removeFilter = screen.getAllByRole('button', {name: 'Remover'});
    await userEvent.click(removeFilter[0]);
    await userEvent.click(removeFilter[1]);
    await userEvent.click(removeFilter[2]);
  });
});

