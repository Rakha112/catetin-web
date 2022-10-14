import React, { useEffect, useLayoutEffect, useRef } from "react";
import "../css/pages/landingpage.css";
import Gambar from "../images/CATETIN.png";
import Button from "../components/Button";
import LoginBox from "../components/LoginBox";
import Navbar from "../components/Navbar";
import SignupBox from "../components/SignupBox";
import { connect } from "react-redux";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const LandingPage = ({ setLoginBox, setSignupBox, loginBox, signupBox }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const location = useLocation();
  let width = window.innerWidth;
  const gambarRef = useRef(null);
  const judulRef = useRef(null);
  const textRef = useRef(null);
  const tombolRef = useRef(null);
  const logInButtonHandle = () => {
    setLoginBox(true);
  };
  const singUpButtonHandle = () => {
    setSignupBox(true);
  };
  useEffect(() => {
    async function profile() {
      await axios.get("http://localhost:3001/profile").then((response) => {
        if (response.data.loggedIn === true) {
          navigate(`note/${response.data.username}`);
        }
      });
    }
    profile();
  }, [navigate]);
  useLayoutEffect(() => {
    gsap.set(
      [judulRef.current, textRef.current, tombolRef.current, gambarRef.current],
      {
        opacity: 0,
        y: 40,
      }
    );
    gsap.to(judulRef.current, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "Power3.easeOut",
      delay: width > 1020 ? 0.2 : 0.4,
    });
    gsap.to(textRef.current, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "Power3.easeOut",
      delay: width > 1020 ? 0.4 : 0.6,
    });
    gsap.to(tombolRef.current, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "Power3.easeOut",
      delay: width > 1020 ? 0.6 : 0.8,
    });
    gsap.to(gambarRef.current, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "Power3.easeOut",
      delay: width > 1020 ? 0.8 : 0.2,
    });
  }, [width]);
  return (
    <div
      className="landingpage"
      style={
        loginBox || signupBox ? { height: "100vh", overflow: "hidden" } : {}
      }
    >
      <Navbar location={location.pathname} />
      <div className="landingpage__container">
        <div className="landingpage__gambar" ref={gambarRef}>
          <img src={Gambar} alt="Gambar Catetin" />
        </div>
        <div className="landingpage__text">
          <h1 ref={judulRef}>Tempat Untuk Mencatat</h1>
          <p ref={textRef}>
            CATETIN merupakan tempat untuk menulis dan mencatat apapun yang
            ingin anda tulis dan catat
          </p>
          <div className="landingpage__button" ref={tombolRef}>
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
const mapStateToProps = (state) => {
  return {
    loginBox: state.loginBox,
    signupBox: state.signupBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
