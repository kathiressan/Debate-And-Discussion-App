import styled from "styled-components";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { IconButton } from "@material-ui/core";
import Animated from "react-mount-animation";

function Comment({ userComment, commentType, userName, timestamp }) {
  return (
    <Animated.div show={true} mountAnim={`0% {opacity: 0} 100% {opacity: 1}`}>
      <Container>
        <div className="sideBar">
          <div className="commentLogo">
            {commentType ? (
              <ThumbUpIcon style={{ color: "#0BDA51" }} />
            ) : (
              <ThumbDownIcon style={{ color: "red" }} />
            )}
          </div>
          <div className="upVote">
            <IconButton>
              <ExpandLessOutlinedIcon />
            </IconButton>
          </div>
          <div className="voteNum">10</div>
          <div className="downVote">
            <IconButton>
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div className="mainComment">
          <div className="commentAuthor">
            {userName ? userName : "Anonymous"} <br />{" "}
            {timestamp ? new Date(timestamp?.seconds * 1000).toUTCString() : ""}
          </div>
          <div className="commentText">{userComment}</div>
        </div>
      </Container>
    </Animated.div>
  );
}

export default Comment;

const Container = styled.div`
  background-color: white;
  margin: 0.5rem 0;
  display: flex;
  min-height: 1rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  .sideBar,
  .mainComment {
    min-height: 100%;
    width: 100%;
    flex: 0.85;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    .commentAuthor {
      color: grey;
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
    }
  }
  .sideBar {
    flex: 0.15;
    text-align: center;
    padding-top: 1rem;
    flex-direction: column;
    background-color: #eaf4fc;
    .upVote {
      cursor: pointer;
      :hover {
        color: green;
      }
    }
    .voteNum {
    }
    .downVote {
      cursor: pointer;
      :hover {
        color: red;
      }
    }
  }
`;
