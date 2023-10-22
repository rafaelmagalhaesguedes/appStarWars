import styled from 'styled-components';

export const TableData = styled.table`
  width: 100%;
  height: 55vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  color: gray;
`;

export const TableHeader = styled.thead`
  width: 100%;
  background-color: #2E3035;
  height: 80px;
  color: white;
  font-size: 14px;

  position: sticky;
  top: 0;

  th {
    padding: 0 15px;
  }
`;
export const TableBody = styled.tbody`
  width: 100%;
  color: #828282;

  td {
    padding: 15px;
    text-align: center;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
  }
`;
