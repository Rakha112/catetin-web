import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
const LoginBox = ({ loginBox, setLoginBox, setSignupBox }) => {
  const loginBoxRef = useRef(null);
  const backdropRef = useRef(null);
  useLayoutEffect(() => {
    if (loginBox) {
      gsap.set(loginBoxRef.current, {
        opacity: 0,
        y: 40,
      });
      gsap.set(backdropRef.current, {
        opacity: 0,
      });
      gsap.to(loginBoxRef.current, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "Power3.easeOut",
      });
      gsap.to(backdropRef.current, {
        duration: 0.5,
        opacity: 0.5,
        ease: "Power3.easeOut",
      });
    }
  }, [loginBox]);
  return (
    <div className={loginBox ? "box aktif" : "box"}>
      <div className="box__backdrop" ref={backdropRef} />
      <div className="box__container" ref={loginBoxRef}>
        <img
          src={Close}
          alt="close"
          onClick={() => {
            gsap.to(backdropRef.current, {
              duration: 0.5,
              opacity: 0,
              ease: "Power3.easeOut",
            });
            gsap.to(loginBoxRef.current, {
              duration: 0.5,
              opacity: 0,
              y: 40,
              ease: "Power3.easeOut",
              onComplete: () => {
                setLoginBox(false);
              },
            });
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
              gsap.to(backdropRef.current, {
                duration: 0.5,
                opacity: 0,
                ease: "Power3.easeOut",
              });
              gsap.to(loginBoxRef.current, {
                duration: 0.5,
                opacity: 0,
                y: 40,
                ease: "Power3.easeOut",
                onComplete: () => {
                  setSignupBox(true);
                  setLoginBox(false);
                },
              });
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
