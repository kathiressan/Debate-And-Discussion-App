import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Head from "next/head";
import Header from "../components/Header";
import styled from "styled-components";

function Topic() {
  const router = useRouter();
  const { topicId } = router.query;
  const [basicTopicInfo, setBasicTopicInfo] = useState(null);
  useEffect(() => {
    db.collection("topics")
      .doc(`${topicId}`)
      .get()
      .then((snapshot) => {
        setBasicTopicInfo(snapshot.data());
      })
      .catch((e) => alert(e));
  }, [topicId]);
  return (
    <Container>
      <Head>
        <title>{basicTopicInfo?.statement}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      <div className="mainBody">
        <h2>Creator: {basicTopicInfo?.creatorName}</h2>
        <h2>Creator Email: {basicTopicInfo?.creatorEmail}</h2>
        <h2>Statement: {basicTopicInfo?.statement}</h2>
        <h2>Description: {basicTopicInfo?.description}</h2>
      </div>

      {/* Main Body */}
      {/* <MainBody>
    <div className="createPostContent">
      <CreateTopic />
    </div>
  </MainBody> */}

      {/* Footer */}
    </Container>
  );
}

export default Topic;

const Container = styled.div`
  background-color: #f6f7f9;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  .mainBody {
    margin-top: 8rem;
  }
`;