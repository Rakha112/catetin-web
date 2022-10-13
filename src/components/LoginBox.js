import React from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
const LoginBox = ({ loginBox, setLoginBox, setSignupBox }) => {
  return (
    <div className={loginBox ? "box aktif" : "box"}>
      <div className="box__backdrop" />
      <div className="box__container">
        <img
          src={Close}
          alt="close"
          onClick={() => {
            setLoginBox(false);
          }}
        />
        <h1>Log In</h1>
        <form action="">
          <label> Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
        </form>
        <Button buttonText={"Log In"} />
        <p>
          Belum punya akun ? Silahkan{" "}
          <span
            onClick={() => {
              setSignupBox(true);
              setLoginBox(false);
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loginBox: state.loginBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
