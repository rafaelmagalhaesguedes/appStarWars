import styled from 'styled-components';
import bgLogin from '../../assets/imgs/bg_star_wars.png';

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${bgLogin});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

export const Logo = styled.div`
  padding: 20px;
`;

export const Image = styled.img`
`;

export const Form = styled.form`
  padding: 50px;
  a {
    background: #FCC419;
    color: #212529;
    padding: 15px 50px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 700;
  }
`;
