import React, { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
import SnackBar from "./SnackBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginBox = ({ loginBox, setLoginBox, setSignupBox, setUsername }) => {
  const navigate = useNavigate();
  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = useState(false);
  const [snackbarPesan, setSnackbarPesan] = useState("");
  const [severity, setSeverity] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginBoxRef = useRef(null);
  const backdropRef = useRef(null);
  axios.defaults.withCredentials = true;
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (username === "" || password === "") {
      setSnackbarPesan("Form tidak boleh kosong");
      setSeverity("warning");
      setOpen(true);
    } else {
      axios
        .post("http://localhost:3001/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.alert === 2) {
            setSnackbarPesan(response.data.message);
            setSeverity("success");
            setOpen(true);
            setUsername(username);
            axios
              .get("http://localhost:3001/profile")
              .then((response) => {
                if (response.data.loggedIn === true) {
                  navigate(`/note/${response.data.username}`);
                }
              })
              .catch((err) => {
                console.log(err.response);
              });
            // navigate(`/note/${username}`);
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
                setUserName("");
                setPassword("");
              },
            });
          }}
        />
        <h1>Log In</h1>
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
        <Button buttonText={"Log In"} klik={handleSubmit} />
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
                  setUserName("");
                  setPassword("");
                },
              });
            }}
          >
            Sign Up
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
    loginBox: state.loginBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoginBox: (data) => dispatch({ type: "LOGIN_BOX", payload: data }),
    setSignupBox: (data) => dispatch({ type: "SIGNUP_BOX", payload: data }),
    setUsername: (data) => dispatch({ type: "SET_USERNAME", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
