import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { useRouter } from "next/router";

function SummaryTopicBox({
  id,
  creatorName,
  creatorEmail,
  creatorPhoto,
  statement,
  description,
  agree,
  disagree,
  timestamp,
}) {
  const router = useRouter();
  const viewTopic = () => {
    if (!id) return;

    router.push(`/topic?topicId=${id}`);
  };
  return (
    <Container onClick={viewTopic}>
      <div className="box-content">
        <div className="text">
          <div className="title">{statement}</div>
          <div className="description">{description}</div>
        </div>

        <div className="votes">
          <div className="agree">
            <CheckCircleIcon />
            <span>{agree}%</span>
          </div>
          <div className="disagree">
            <CancelIcon />
            <span>{disagree}%</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SummaryTopicBox;

const Container = styled.div`
  color: #150e56;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  min-width: 15rem;
  min-height: 15rem;
  border: 1px solid white;
  background-color: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  cursor: pointer;
  :hover {
    border: 1px solid #1a73e8;
    color: #1a73e8;
  }
  :hover .box-content .text .title {
    border-bottom: 1px solid #1a73e8;
  }
  :hover .box-content .votes .agree {
    border-right: 0.5px solid #1a73e8;
  }
  :hover .box-content .votes .disagree {
    border-left: 0.5px solid #1a73e8;
  }
  @media only screen and (max-width: 640px) {
    min-width: 18rem;
    min-height: 18rem;
    max-width: 20rem;
    max-height: 20rem;
  }
  @media only screen and (min-width: 640px) {
    min-width: 18rem;
    min-height: 18rem;
    max-width: 20rem;
    max-height: 20rem;
  }
  @media only screen and (min-width: 1024px) {
    max-width: 23rem;
    max-height: 23rem;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 20rem;
    max-height: 20rem;
  }
  .box-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 20rem;
    .votes {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 0;
      .agree {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 0.5px solid #1a73e8;
        padding: 0 0.2rem;
        color: #388e55;
      }
      .disagree {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 0.5px solid #1a73e8;
        padding: 0 0.2rem;
        color: #d21f00;
        span {
          padding-left: 2px;
        }
      }
    }
    .text {
      max-height: 80%;
      .title {
        overflow: hidden;
        max-height: 40%;
        border-bottom: 1px solid #1a73e8;
        padding: 0.5rem;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 600;
        font-size: 1rem;
        @media only screen and (min-width: 1280px) {
          font-size: 1.2rem;
        }
      }
      .description {
        overflow: hidden;
        max-height: 60%;
        padding: 0.5rem;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 400;
        font-size: 0.95rem;
        @media only screen and (min-width: 1280px) {
          font-size: 1rem;
        }
      }
    }
  }
`;
