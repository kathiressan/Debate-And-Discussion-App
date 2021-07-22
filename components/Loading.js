import { Circle } from "better-react-spinkit";
function Loading() {
  return (
    <div>
      <center
        style={{ display: "grid", placeItems: "center", height: "100vh" }}
      >
        <div>
          <div style={{ color: "#1a73e8", fontSize: "3rem" }}>Debate App</div>
          <Circle color="#1a73e8" size={100} />
        </div>
      </center>
    </div>
  );
}

export default Loading;
