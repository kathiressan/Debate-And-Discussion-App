import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function CreateTopic() {
  const [statement, setStatement] = useState("");
  const [description, setDescription] = useState("");
  const getUser = useSelector(selectUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createtopic = () => {
    db.collection("topics").add({
      creatorName: getUser.displayName,
      creatorEmail: getUser.email,
      creatorPhoto: getUser.photoURL || "",
      statement: statement,
      description: description,
      agree: 0,
      disagree: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setStatement("");
    setDescription("");

    router.push("/");
  };
  return (
    <Form onSubmit={handleSubmit(createtopic)}>
      <div className="formContent">
        <h1>Create a new topic.</h1>
        <label>Declarative Statement: </label>
        <input
          {...register("formStatement", { required: true, minLength: 10 })}
          type="text"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        />
        {errors?.formStatement?.type === "required" && (
          <p className="errors">This field is required</p>
        )}
        {errors?.formStatement?.type === "minLength" && (
          <p className="errors">Min length is 10 characters</p>
        )}
        <label>Description: </label>
        <textarea
          {...register("formDescription", { required: true, minLength: 10 })}
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors?.formDescription?.type === "required" && (
          <p className="errors">This field is required</p>
        )}
        {errors?.formDescription?.type === "minLength" && (
          <p className="errors">Min length is 10 characters</p>
        )}
        <button>Create Topic</button>
      </div>
    </Form>
  );
}

export default CreateTopic;

const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: center;
  @media only screen and (min-width: 1024px) {
    padding: 2rem 5rem;
  }
  .formContent {
    display: flex;
    flex-direction: column;
    align-items: start;
    h1 {
      color: #1a73e8;
      margin-bottom: 1rem;
    }
    label {
      margin-bottom: 0.5rem;
    }
    label:nth-of-type(2) {
      margin-top: 1rem;
    }
    textarea {
      resize: none;
      @media only screen and (max-width: 640px) {
        width: 13rem;
        height: 8rem;
      }
    }
    input {
      padding: 0.2rem 0;
    }
    input,
    textarea {
      width: 50vw;
      border: 1px solid grey;
      border-radius: 0.2rem;
      max-width: 20rem;
      outline: none;
      :focus {
        --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        border: 1px solid #1a73e8;
      }
    }
    button {
      margin: 1rem 0 0;
      border-radius: 2rem;
      border: none;
      padding: 0.6rem;
      cursor: pointer;
      background-color: #1a73e8;
      color: white;
      :hover {
        --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
      }
    }
  }

  .errors {
    color: red;
  }
`;

// button {
//   align-self: end;
//   margin: 1rem 0 0;
//   padding: 0.6rem;
//   border-radius: 2rem;
//   border: none;
//   cursor: pointer;
//   background-color: #1a73e8;
//   color: white;
// :hover {
//   --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
//     0 10px 10px -5px rgba(0, 0, 0, 0.04);
//   box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
//     var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
// }
// }
// input,
// textarea {
//   border: 1px solid grey;
//   outline: none;
//   border-radius: 2rem;
//   max-width: 30rem;
//   :focus {
//     border: 1px solid #1a73e8;
//   }
// }
// input {
//   width: 40%;
//   padding: 1rem;
// }
