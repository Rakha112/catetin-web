import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
const SignupBox = ({ signupBox, setSignupBox, setLoginBox }) => {
  const signupBoxRef = useRef(null);
  const backdropRef = useRef(null);
  useLayoutEffect(() => {
    if (signupBox) {
      gsap.set(signupBoxRef.current, {
        opacity: 0,
        y: 40,
      });
      gsap.set(backdropRef.current, {
        opacity: 0,
      });
      gsap.to(signupBoxRef.current, {
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
  }, [signupBox]);
  return (
    <div className={signupBox ? "box aktif" : "box"}>
      <div className="box__backdrop" ref={backdropRef} />
      <div className="box__container" ref={signupBoxRef}>
        <img
          src={Close}
          alt="close"
          onClick={() => {
            gsap.to(backdropRef.current, {
              duration: 0.5,
              opacity: 0,
              ease: "Power3.easeOut",
            });
            gsap.to(signupBoxRef.current, {
              duration: 0.5,
              opacity: 0,
              y: 40,
              ease: "Power3.easeOut",
              onComplete: () => {
                setSignupBox(false);
              },
            });
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
              gsap.to(backdropRef.current, {
                duration: 0.5,
                opacity: 0,
                ease: "Power3.easeOut",
              });
              gsap.to(signupBoxRef.current, {
                duration: 0.5,
                opacity: 0,
                y: 40,
                ease: "Power3.easeOut",
                onComplete: () => {
                  setSignupBox(false);
                  setLoginBox(true);
                },
              });
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
