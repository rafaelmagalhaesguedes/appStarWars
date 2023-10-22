import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .iconSearch {
    color: white;
    position: relative;
    right: 30px;
    cursor: pointer;
  }
`;

export const InputSearch = styled.input`
  width: 671px;
  height: 42px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #FFFFFF;
  color: white;
  padding: 0 15px;
  font-size: 1.2rem;

  &:focus {
    border: 1px solid darkgray;
    outline: none;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); 
  }
`;
