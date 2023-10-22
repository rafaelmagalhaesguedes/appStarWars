import styled from 'styled-components';
import bgHome from '../../assets/imgs/bg_star_wars.png';

export const HomeContainer = styled.div`
  width: 100%;
  height: auto;

 
  background-color: #0D5140;
  background-image: url(${bgHome});
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const Header = styled.header`
  padding-top: 180px;
`;

export const Main = styled.section`
  width: 90vw;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 400px 0 30px 0;
  padding: 30px;
`;

export const Filter = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

export const TableData = styled.table`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
