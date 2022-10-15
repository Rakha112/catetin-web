import React, { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
import axios from "axios";
import SnackBar from "./SnackBar";
const SignupBox = ({ signupBox, setSignupBox, setLoginBox }) => {
  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = useState(false);
  const [snackbarPesan, setSnackbarPesan] = useState("");
  const [severity, setSeverity] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const signupBoxRef = useRef(null);
  const backdropRef = useRef(null);
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
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
  const handleSubmit = () => {
    setOpen(false);
    if (username === "" || password === "") {
      setSnackbarPesan("Form tidak boleh kosong");
      setSeverity("warning");
      setOpen(true);
    } else {
      axios
        .post("https://apicatetin.rakhawibowo.my.id/signup", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.alert === 2) {
            setSnackbarPesan(response.data.message);
            setSeverity("success");
            setOpen(true);
            setTimeout(() => {
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
                  setUserName("");
                  setPassword("");
                },
              });
            }, 2000);
          } else if (response.data.alert === 3) {
            setSnackbarPesan(response.data.message);
            setSeverity("error");
            setOpen(true);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

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
                setUserName("");
                setPassword("");
              },
            });
          }}
        />
        <h1>Sign Up</h1>
        <form action="">
          <label> Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={username}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </form>
        <Button buttonText={"Sign Up"} klik={handleSubmit} type={"hitam"} />
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
                  setUserName("");
                  setPassword("");
                },
              });
            }}
          >
            Log In
          </span>
        </p>
      </div>
      <SnackBar
        open={open}
        pesan={snackbarPesan}
        severity={severity}
        vertical={vertical}
        horizontal={horizontal}
        handleClose={handleClose}
      />
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
