import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm/SearchForm';

describe('Tests component SearchForm', () => {  
  test('Verifica se o input de pesquisa é renderizado', () => {
    render(<SearchForm />);
    const textInput = screen.getByTestId('name-filter');
    expect(textInput).toBeInTheDocument();
  });
});

