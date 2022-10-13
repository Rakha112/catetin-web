import React from "react";
import CatetinLogo from "../images/CATETIN2.png";
import "../css/components/navbar.css";
import Button from "./Button";
import { connect } from "react-redux";
const Navbar = ({ setLoginBox, setSignupBox }) => {
  const logInButtonHandle = () => {
    setLoginBox(true);
  };
  const singUpButtonHandle = () => {
    setSignupBox(true);
  };
  return (
    <div className="navbar">
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
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
