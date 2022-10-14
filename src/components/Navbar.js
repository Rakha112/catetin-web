import React, { useLayoutEffect, useRef } from "react";
import CatetinLogo from "../images/CATETIN2.png";
import ProfileIcon from "../icons/user.png";
import "../css/components/navbar.css";
import Button from "./Button";
import { connect } from "react-redux";
import gsap from "gsap";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Navbar = ({ setLoginBox, setSignupBox, location }) => {
  const navRef = useRef(null);
  const logInButtonHandle = () => {
    setLoginBox(true);
  };
  const singUpButtonHandle = () => {
    setSignupBox(true);
  };
  useLayoutEffect(() => {
    gsap.set(navRef.current, {
      opacity: 0,
      y: 40,
    });
    gsap.to(navRef.current, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "Power3.easeOut",
    });
  }, []);
  if (location === "/") {
    return (
      <div className="navbar" ref={navRef}>
        <div className="navbar__logo">
          <img src={CatetinLogo} alt="logo" />
          <h1>Catetin</h1>
        </div>
        <div className="navbar__button">
          <Button buttonText={"Log In"} klik={logInButtonHandle} />
          <Button buttonText={"Sign Up"} klik={singUpButtonHandle} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-note" ref={navRef}>
        <div className="navbar-note__logo">
          <img src={ProfileIcon} alt="user" />
          <h1>a</h1>
        </div>
        <div className="navbar-note__button">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    );
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
