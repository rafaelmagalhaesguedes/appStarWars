import { render, screen, fireEvent } from '@testing-library/react';
import FilterForm from '../components/FilterForm/FilterForm';
import SearchForm from '../components/SearchForm/SearchForm';
import Table from '../components/Table/Table';

describe('Tests component SearchForm', () => {  
  test('Verifica se o input de pesquisa é renderizado', () => {
    render(<SearchForm />);
    const textInput = screen.getByTestId('name-filter');
    expect(textInput).toBeInTheDocument();
  });
});

describe('Tests component FilterForm', () => {
  test('Verifica se o form renderiza com os valores iniciais corretos', () => {
    render(<FilterForm />);
    expect(screen.getByTestId('column-filter')).toHaveValue('population');
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    expect(screen.getByTestId('value-filter')).toHaveValue(0);
  });

  test('Verifica se renderiza o botão Filtrar', () => {
    render(<FilterForm />);
    const filterButton = screen.getByRole('button', { name: 'Filtrar' });
    expect(filterButton).toBeInTheDocument();
  });

  test('Verifica se atualiza os dados do formulário', () => {
    render(<FilterForm />);
    
    // Altera entrada column
    fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'orbital_period' } });
    expect(screen.getByTestId('column-filter')).toHaveValue('orbital_period');

    // Altera entrada comparison
    fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'menor que' } });
    expect(screen.getByTestId('comparison-filter')).toHaveValue('menor que');

    // Altera entrada para value
    fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '100' } });
    expect(screen.getByTestId('value-filter')).toHaveValue(100);
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
