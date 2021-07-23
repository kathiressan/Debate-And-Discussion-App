import Head from "next/head";
import Header from "../components/Header";
import styled from "styled-components";
import MainBody from "../components/MainBody";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      dispatch(
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    }
  }, [user, dispatch]);

  if (loading) return <Loading />;

  if (!user) return <Login />;
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />

      {/* Main Body */}
      <MainBody />

      {/* Footer */}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f6f7f9;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
