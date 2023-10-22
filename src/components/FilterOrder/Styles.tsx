import styled from 'styled-components';

export const FilterOrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const InputsRadius = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 23px;
`;

export const InputsBox = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  padding: 5px 0;

  input {
    width: 50px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;
