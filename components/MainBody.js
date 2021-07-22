import styled from "styled-components";
import SummaryTopicBox from "./SummaryTopicBox";

function MainBody() {
  return (
    <Container>
      <div className="content">
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
        <SummaryTopicBox />
      </div>
    </Container>
  );
}

export default MainBody;

const Container = styled.div`
  margin-top: 6rem;
  @media only screen and (min-width: 768px) {
    margin-top: 7rem;
  }
  @media only screen and (min-width: 1280px) {
    margin-top: 8rem;
  }
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
  .content {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 1rem;
    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (min-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media only screen and (min-width: 1536px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
