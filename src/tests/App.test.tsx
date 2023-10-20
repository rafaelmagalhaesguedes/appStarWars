import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PlanetContext } from '../context/PlanetContext';
import userEvent from '@testing-library/user-event';
import Provider from '../context/PlanetProvider';
import { vi } from 'vitest';
import mock from './mock';
import App from '../App';

describe('Tests component Table', () => {

  const mockFetching = {
    json: async () => mock,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(mockFetching);

  test('Verifica conexão e renderização da tabela', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const columnName = screen.getByText('Name');
    expect(columnName).toBeInTheDocument();
    await screen.findByText('Tatooine');
  });
});

describe('Tests component FilterText', () => {
  test('Verifica se o filtro de texto renderiza corretamente', () => {
    render(<App />);
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

describe('Tests components FilterNumeric', () => {

  test('Verifica se o component renderiza corretamente', () => {
    render(
      <Provider>
        <App />
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

  test('Verifica se o filtro numérico funciona corretamente', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const selectOrder = screen.getByTestId('column-sort');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputElement = screen.getByTestId('value-filter');
  
    await userEvent.selectOptions(selectOrder, ['population']);
    await userEvent.selectOptions(selectComparison, ['igual a']);
    fireEvent.change(inputElement, { target: { value: '1000' } });
  
    const buttonFilter = screen.getByTestId('button-filter');
    await userEvent.click(buttonFilter);
  
    const planetName = screen.getByText('Yavin IV');
    expect(planetName).toBeInTheDocument();
  });
  

  test('Verifica se a remoção de filtros funciona corretamente', async () => {
    render(
    <Provider>
      <App />
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

describe('Tests component FilterOrder', () => {
  test('Verifica se clicar no botão "Order" chama handleOrderColumn com a ordem correta', () => {
    const handleOrderColumn = vi.fn();
  
    render(
      <PlanetContext.Provider value={{handleOrderColumn}}>
        <App />
      </PlanetContext.Provider>
    );
  
    const buttonOrder = screen.getByTestId('column-sort-button');
  
    fireEvent.click(buttonOrder);
  
    expect(handleOrderColumn).toHaveBeenCalledWith({
      column: 'population',
      order: 'DESC',
    });
  });

  test('Verifica se o filtro de ordenação funciona corretamente', async () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    const selectColumn = screen.getByTestId('column-filter');
    await userEvent.selectOptions(selectColumn, 'population');

    const inputOrder = screen.getByTestId('column-sort-input-asc')
    await userEvent.type(inputOrder, 'ASC');

    const buttonOrder = screen.getByTestId('column-sort-button');

    fireEvent.click(buttonOrder);

    const namePlanet = screen.getByText('Yavin IV');
    expect(namePlanet).toBeInTheDocument();
  });
});

