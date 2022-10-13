import React from "react";
import "../css/pages/landingpage.css";
import Gambar from "../images/CATETIN.png";
import Button from "../components/Button";
import LoginBox from "../components/LoginBox";
import Navbar from "../components/Navbar";
import SignupBox from "../components/SignupBox";
import { connect } from "react-redux";
const LandingPage = ({ setLoginBox, setSignupBox }) => {
  const logInButtonHandle = () => {
    setLoginBox(true);
  };
  const singUpButtonHandle = () => {
    setSignupBox(true);
  };
  return (
    <div className="landingpage">
      <Navbar />
      <div className="landingpage__container">
        <div className="landingpage__gambar">
          <img src={Gambar} alt="Gambar Catetin" />
        </div>
        <div className="landingpage__text">
          <h1>Tempat Untuk Mencatat</h1>
          <p>
            CATETIN merupakan tempat untuk menulis dan mencatat apapun yang
            ingin anda tulis dan catat
          </p>
          <div className="landingpage__button">
            <Button buttonText={"Sign Up"} klik={singUpButtonHandle} />
            <Button buttonText={"Log In"} klik={logInButtonHandle} />
          </div>
        </div>
      </div>
      <LoginBox />
      <SignupBox />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(LandingPage);
