import React, { useEffect } from "react";
import "../css/pages/notepage.css";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomSheet from "../components/BottomSheet";
export const NotePage = ({}) => {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/profile")
      .then((response) => {
        if (response.data.loggedIn === true) {
          axios
            .get("http://localhost:3001/note", {
              params: {
                user: response.data.username,
              },
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="notepage">
      <Navbar location={"/note"} />
      <div className="notepage__container"></div>
      <BottomSheet />
    </div>
  );
};

export default connect()(NotePage);
