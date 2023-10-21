import { Link } from 'react-router-dom';
import { Form, Image, LoginContainer, Logo } from './Styles';
import logo from '../../assets/imgs/logo-star wars.png';

function Login() {
  return (
    <LoginContainer>
      <Logo>
        <Image src={ logo } alt="" />
      </Logo>
      <Form>
        <Link to="/home">Explore Planets</Link>
      </Form>
    </LoginContainer>
  );
}

export default Login;
