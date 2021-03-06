import React, { Fragment } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { signIn, signOut } from "./actions/index";
import { connect } from "react-redux";

import LoginModal from "./Header/LoginModal";
import LoginModalForm from "./Header/LoginModalForm";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import FaceIcon from "@material-ui/icons/Face";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LanguageIcon from "@material-ui/icons/Language";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SettingsApplicationsOutlinedIcon from "@material-ui/icons/SettingsApplicationsOutlined";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "./Header/SearchBar/SearchBar";
import LoginSignUpButton from "./Header/LoginSignUpButton";
import FirstIconRight from "./FirstIconRight";
import NavBar from "./Header/NavBar/NavBar";
import NavItem from "./Header/NavBar/NavItem";
import DropdownMenu from "./Header/NavBar/DropdownMenu";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      open: false,
    };
  }

  openLoginModal = () => {
    this.modalRef.current.openModal();
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1039122878379-b81ks1uqmmh4frc0dl9rm1ut4rg2708f.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const profile = this.auth.currentUser.get().getBasicProfile();
      this.props.signIn(profile);
    } else {
      this.props.signOut();
    }
  };
  onSignIn = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };

  renderButton() {
    if (this.props.isSignedIn === null) {
      return (
        <div
          style={{ fontSize: "2.1875rem" }}
          className="ui active small inline loader"
        ></div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <NavBar>
          <NavItem
            loggedIcon={<AccountCircleOutlinedIcon className="header__icon" />}
          >
            <DropdownMenu
              onSignOut={this.onSignOut}
              allContents={loggedInContents}
              languages={languages}
              userImage={this.props.userImage}
              userEmail={this.props.userEmail}
            ></DropdownMenu>
          </NavItem>
        </NavBar>
      );
    } else {
      return (
        <>
          <LoginSignUpButton />

          <NavBar>
            <NavItem
              notLoggedIcon={
                <FaceIcon fontSize="large" className="header__icon" />
              }
            >
              <DropdownMenu
                allContents={yetLoggedInContents}
                languages={languages}
              ></DropdownMenu>
            </NavItem>
          </NavBar>
        </>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header__left">
          <button>
            <MenuIcon />
          </button>
          <Link to="/">
            <img
              className="header__logo"
              src="https://react.semantic-ui.com/logo.png"
              alt="youtube"
            />
          </Link>
        </div>
        <div className="header__input">
          <SearchBar onSubmitForm={this.props.onSubmitForm} />
          <SearchIcon className="header__inputButton" />
        </div>
        <div className="header__icons">
          <Link to="/streams/new">
            <VideoCallIcon
              style={{ marginRight: "10px" }}
              className="header__icon"
            />
          </Link>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    userImage: state.auth.userImage,
    userEmail: state.auth.userEmail,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(Header);

const yetLoggedInContents = [
  {
    content: "Language",
    rightIcon: <ChevronRightIcon />,
    leftIcon: <LanguageIcon />,
    goToMenu: "settings",
  },
  {
    content: "Dark Theme",
    rightIcon: <ToggleOffOutlinedIcon />,
    leftIcon: <Brightness2OutlinedIcon />,
  },
  {
    content: "Log In",
    leftIcon: <ExitToAppIcon />,
  },
];

const loggedInContents = [
  {
    content: "",
    leftIcon: "",

    logged: true,
    online: "Online",
    offline: "offline",
  },
  {
    content: "Creator Dashboard",
    leftIcon: <DashboardOutlinedIcon />,
    logged: true,
  },
  {
    content: "Friends",
    leftIcon: <SupervisedUserCircleOutlinedIcon />,
    logged: true,
  },
  {
    content: "Subscriptions",
    leftIcon: <SubscriptionsOutlinedIcon />,
    logged: true,
  },

  {
    content: "Settings",
    leftIcon: <SettingsApplicationsOutlinedIcon />,
    logged: true,
  },
  {
    content: "Language",
    goToMenu: "settings",
    rightIcon: <ChevronRightIcon />,
    leftIcon: <LanguageIcon />,
    logged: true,
  },

  {
    content: "Dark Theme",
    rightIcon: <ToggleOffOutlinedIcon />,
    leftIcon: <Brightness2OutlinedIcon />,
    logged: true,
  },
  {
    content: "Log Out",
    leftIcon: <ExitToAppIcon />,
    logged: true,
  },
  // {
  //   content: "Create DashBoard",
  //   leftIcon: <BoltIcon />
  // }
];
const languages = [
  {
    language: "Select",
    leftIcon: <ChevronLeftIcon />,
    goToMenu: "main",
    backgroundcolor: "#EFEFF1",
    logged: true,
  },
  {
    language: "English",
    logged: true,
  },
  {
    language: "Dansk",
    logged: true,
  },
  {
    language: "English - UK",
    logged: true,
  },
  {
    language: "Español - España",
    logged: true,
  },
  {
    language: "中文 简体",
    logged: true,
  },
  {
    language: "日本語",
    logged: true,
  },
  {
    language: "한국어",
    logged: true,
  },
];
