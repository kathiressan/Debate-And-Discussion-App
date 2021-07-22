import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";

function login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error));
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <div className="logo">Debate App</div>
        <Button onClick={() => signIn()} variant="outlined" className="btn">
          Sign In With Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #1a73e8;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

  .logo {
    color: #1a73e8;
    font-weight: bold;
    font-size: 2rem;
    padding-bottom: 1rem;
  }

  .btn {
    background-color: white;
    :hover {
      transition: color 0.2s, background-color 0.4s;
      background-color: #1a73e8;
      color: white;
    }
  }
`;
