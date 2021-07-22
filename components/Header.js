import styled from "styled-components";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Tooltip from "react-simple-tooltip";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <Container>
      {/* Left */}
      <Left>
        <div className="logo">LOGO</div>
        <div className="appName">Debate</div>
      </Left>

      {/* Center */}
      <Center>
        <div>
          <SearchOutlinedIcon />
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" />
          </form>
        </div>
      </Center>

      {/* Right */}
      <Right>
        <div className="menuIcon">
          <IconButton>
            <MenuOutlinedIcon className="burgerMenu" />
          </IconButton>
        </div>
        <div className="menu">
          <Tooltip
            placement="bottom"
            content={<ToolTipWord>Create New Post</ToolTipWord>}
          >
            <div className="createPost">
              <IconButton>
                <AddCircleOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip
            placement="bottom"
            content={<ToolTipWord>Notifications</ToolTipWord>}
          >
            <div className="notificationIcon">
              <IconButton>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Tooltip
            placement="bottom"
            content={<ToolTipWord>Log Out</ToolTipWord>}
          >
            <div className="logoutIcon">
              <IconButton onClick={() => auth.signOut()}>
                <ExitToAppOutlinedIcon />
              </IconButton>
            </div>
          </Tooltip>

          <div className="avatar">
            <Avatar src={user.photoURL} />
          </div>
        </div>
      </Right>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  z-index: 1;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #1a73e8;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 1rem;
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 1.3rem;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 1.5rem;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid white;
    padding: 0.4rem;
    :hover,
    :focus-within {
      --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
    @media only screen and (min-width: 768px) {
      padding: 0.5rem;
    }
    @media only screen and (min-width: 1024px) {
      padding: 0.6rem;
    }
    @media only screen and (min-width: 1280px) {
      font-size: 1.5rem;
    }
    input {
      border: none;
      outline: none;
      width: 40vw;
      max-width: 35rem;
      background-color: #1a73e8;
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  .MuiSvgIcon-root {
    color: white;
    @media only screen and (min-width: 1280px) {
      font-size: 2rem;
    }
  }
  .menuIcon {
    .MuiSvgIcon-root {
      @media only screen and (min-width: 768px) {
        font-size: 2rem;
      }
      @media only screen and (min-width: 1024px) {
        display: none;
      }
    }
  }
  .menu {
    display: none;
    @media only screen and (min-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logoutIcon {
      margin-right: 0.625rem;
    }
  }
`;

const ToolTipWord = styled.div`
  white-space: nowrap;
`;
