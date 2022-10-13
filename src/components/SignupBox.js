import React from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
const SignupBox = ({ signupBox, setSignupBox, setLoginBox }) => {
  return (
    <div className={signupBox ? "box aktif" : "box"}>
      <div className="box__backdrop" />
      <div className="box__container">
        <img
          src={Close}
          alt="close"
          onClick={() => {
            setSignupBox(false);
          }}
        />
        <h1>Sign Up</h1>
        <form action="">
          <label> Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
        </form>
        <Button buttonText={"Sign Up"} />
        <p>
          Sudah punya akun ? Silahkan{" "}
          <span
            onClick={() => {
              setSignupBox(false);
              setLoginBox(true);
            }}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    signupBox: state.signupBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupBox);
