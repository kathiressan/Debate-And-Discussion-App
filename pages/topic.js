import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Head from "next/head";
import Header from "../components/Header";
import styled from "styled-components";
import Comment from "../components/Comment";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Login from "./login";
import firebase from "firebase";

function Topic() {
  const router = useRouter();
  const getUser = useSelector(selectUser);
  const { topicId } = router.query;
  const [basicTopicInfo, setBasicTopicInfo] = useState(null);
  const [agreeRadio, setAgreeRadio] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    db.collection("topics")
      .doc(`${topicId}`)
      .get()
      .then((snapshot) => {
        setBasicTopicInfo(snapshot.data());
      })
      .catch((e) => alert(e));
    return function cleanup() {
      setBasicTopicInfo(null);
    };
  }, [topicId]);

  useEffect(() => {
    db.collection("topics")
      .doc(topicId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [topicId]);

  const createComment = () => {
    db.collection("topics")
      .doc(topicId)
      .collection("comments")
      .add({
        userName: getUser.displayName,
        userEmail: getUser.email,
        userPhoto: getUser.photoURL || "",
        userComment: userComment,
        isAgree: agreeRadio,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setUserComment("");
  };

  const colorWhite = {
    transition: "all .3s ease-in-out",
    backgroundColor: "white",
  };
  const colorBlue = {
    transition: "all .3s ease-in-out",
    backgroundColor: "#1a73e8",
  };
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
        <div className="postCommentContainer">
          <h1>Post Comment</h1>
          <form onSubmit={handleSubmit(createComment)}>
            <div className="checkbox">
              <div className="agreeCheckbox">
                <div
                  className="option1"
                  onClick={() => setAgreeRadio(true)}
                  style={agreeRadio ? colorBlue : colorWhite}
                ></div>
                <span>Agree</span>
              </div>
              <div className="disagreeCheckbox">
                <div
                  className="option2"
                  onClick={() => setAgreeRadio(false)}
                  style={agreeRadio ? colorWhite : colorBlue}
                ></div>
                <span>Disagree</span>
              </div>
            </div>
            <div className="submitOption">
              <input
                {...register("formComment", { required: true, minLength: 10 })}
                type="text"
                placeholder="Enter comment"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
              {errors?.formComment?.type === "required" && (
                <p className="errors">Comment is required</p>
              )}
              {errors?.formComment?.type === "minLength" && (
                <p className="errors">Min length is 10 characters</p>
              )}
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="commentField">
        {comments?.map(
          ({
            id,
            data: {
              userName,
              userEmail,
              userPhoto,
              userComment,
              isAgree,
              timestamp,
            },
          }) => (
            <Comment
              key={id}
              userComment={userComment}
              commentType={isAgree}
              userName={userName}
              timestamp={timestamp}
            />
          )
        )}
      </div>

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
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    margin-top: 5.8rem;
    background-color: white;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 12vh;
    .postCommentContainer {
      padding: 1rem;
    }
    h1 {
      color: #1a73e8;
      font-size: 1rem;
    }
    form {
      font-size: 0.7rem;
      display: flex;
      flex-direction: column;
      .checkbox {
        display: flex;
        padding: 0.1rem;
        padding-top: 0.5rem;
        .option1,
        .option2 {
          cursor: pointer;
          color: white;
          border: 1px solid #1a73e8;
          height: 0.5rem;
          width: 0.5rem;
          border-radius: 50%;
        }
        .agreeCheckbox,
        .disagreeCheckbox {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            padding-left: 0.2rem;
            padding-right: 0.5rem;
          }
        }
      }
      .submitOption {
        display: flex;
        padding-top: 0.45rem;
        input {
          padding: 0.2rem;
          border-radius: 0.4rem;
          border: none;
          border: 1px solid grey;
          :focus {
            border: 1px solid #1a73e8;

            :focus-visible {
              outline: none;
            }
          }
        }
        .errors {
          color: red;
          position: absolute;
          margin-top: 1.6rem;
          margin-left: 0.2rem;
        }
        button {
          /* padding: 0.1rem 0.4rem; */
          margin-left: 0.3rem;
          cursor: pointer;
          background-color: #1a73e8;
          border: none;
          border-radius: 0.2rem;
          color: white;
          :hover {
            --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          }
        }
      }
    }
  }
  .commentField {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
`;

// <h2>Creator: {basicTopicInfo?.creatorName}</h2>
// <h2>Creator Email: {basicTopicInfo?.creatorEmail}</h2>
// <h2>Statement: {basicTopicInfo?.statement}</h2>
// <h2>Description: {basicTopicInfo?.description}</h2>
