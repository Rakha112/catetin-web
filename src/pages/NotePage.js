import React, { useEffect, useRef, useState } from "react";
import "../css/pages/notepage.css";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomSheet from "../components/BottomSheet";
export const NotePage = (props) => {
  const [data, setData] = useState([]);
  const bottomSheetRef = useRef(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://apicatetin.rakhawibowo.my.id/profile")
      .then((response) => {
        if (response.data.loggedIn === true) {
          axios
            .get("https://apicatetin.rakhawibowo.my.id/note", {
              params: {
                user: response.data.username,
              },
            })
            .then((res) => {
              setData(res.data);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div className="notepage">
      <Navbar location={"/note"} bottomSheetRef={bottomSheetRef} />
      <div className="notepage__container">
        {data.length === 0 ? (
          <div className="notepage__kosong">
            <p>Belum ada catatan...</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <BottomSheet ref={bottomSheetRef} />
    </div>
  );
};

export default connect()(NotePage);
