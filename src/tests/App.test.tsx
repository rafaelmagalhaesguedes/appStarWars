import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import mock from './mock';
import Provider from '../context/planet-provider';
import FilterForm from '../components/FilterForm/FilterForm';
import SearchForm from '../components/SearchForm/SearchForm';
import Table from '../components/Table/Table';

const mockFetching = {
  json: async () => mock,
} as Response;

const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(mockFetching)

describe('Tests component SearchForm', () => {  
  test('Verifica se o input de pesquisa é renderizado', () => {
    render(<SearchForm />);
    const textInput = screen.getByTestId('name-filter');
    expect(textInput).toBeInTheDocument();
  });
});

describe('Tests component FilterForm', () => {
  test('Verifica se o form renderiza com os valores iniciais corretos', () => {
    render(
      <Provider>
        <FilterForm />
      </Provider>
    );
    expect(screen.getByTestId('column-filter')).toHaveValue('population');
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    expect(screen.getByTestId('value-filter')).toHaveValue(0);
  });

  test('Verifica se renderiza o botão Filtrar e Remover', () => {
    render(
      <Provider>
        <FilterForm />
      </Provider>
    );
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    const removeButton = screen.getByRole('button', { name: 'Remover Filter' });
    expect(filterButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  test('Verifica se atualiza os dados do formulário', () => {
    render(
      <Provider>
        <FilterForm />
      </Provider>
    );
    
    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'orbital_period' } });
    expect(screen.getByTestId('column-filter')).toHaveValue('orbital_period');

    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'menor que' } });
    expect(screen.getByTestId('comparison-filter')).toHaveValue('menor que');

    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '100' } });
    expect(screen.getByTestId('value-filter')).toHaveValue(100);
  });

  test('Verifica se os campos do formulário podem ser preenchidos e enviados corretamente', () => {
    render(
      <Provider>
        <FilterForm />
      </Provider>
    );
  
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
  
    fireEvent.change(columnFilter, { target: { value: 'diameter' } });
    fireEvent.change(comparisonFilter, { target: { value: 'maior que' } });
    fireEvent.change(valueFilter, { target: { value: '5000' } });
  
    expect(columnFilter).toHaveValue('diameter');
    expect(comparisonFilter).toHaveValue('maior que');
    expect(valueFilter).toHaveValue(5000);

    const filterButton = screen.getByTestId('button-filter');
    fireEvent.click(filterButton);
  
    const filters = screen.getAllByTestId('filter');
    expect(filters.length).toBe(1);
    expect(screen.getByText('diameter')).toBeInTheDocument();
  
    const comparisonTextElements = screen.queryAllByText('maior que');
    expect(comparisonTextElements.length).toBe(2);

    expect(valueFilter).toHaveValue(0);
  });  

  test('Verifica se a remoção de filtros funciona corretamente', () => {
    render(
      <Provider>
        <FilterForm />
      </Provider>
    );

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    fireEvent.change(columnFilter, { target: { value: 'diameter' } });
    fireEvent.change(comparisonFilter, { target: { value: 'maior que' } });
    fireEvent.change(valueFilter, { target: { value: '5000' } });

    const filterButton = screen.getByTestId('button-filter');
    fireEvent.click(filterButton);

    const filters = screen.getAllByTestId('filter');
    expect(filters.length).toBe(1);

    const removeFilterButton = screen.getByTestId('button-remove-filters');
    fireEvent.click(removeFilterButton);

    const removedFilters = screen.queryAllByTestId('filter');
    expect(removedFilters.length).toBe(0);
  });
});

describe('Tests component Table', () => {
  it('Verifica se o header da tabela é renderizado', () => {
    render(<Table />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rotation')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period')).toBeInTheDocument();
    expect(screen.getByText('Diameter')).toBeInTheDocument();
    expect(screen.getByText('Climate')).toBeInTheDocument();
    expect(screen.getByText('Gravity')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
    expect(screen.getByText('Surface Water')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Films')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Edited')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
  });
});
