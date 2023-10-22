import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const InputsFilter = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  label {
    color: #AEAEAE;
  }
  
  select {
    color: white;
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    cursor: pointer;
    padding: 10px 20px 7px 0;
    font-size: 1rem;
  }

  option {
    background: black;
  }
`;

export const InputValue = styled.input`
  height: 42px;
  width: 160px;
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 20px 10px;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 20px;
`;

export const ButtonFilter = styled.button`
  width: 91px;
  height: 82px;
  border: 1px solid white;
  border-radius: 4px;
  background: transparent;
  color: #FAE60A;
  font-weight: 700;
  cursor: pointer;
  margin-top: 20px;
`;

export const DisplayFilters = styled.div`
  color: white;
`;
