import React, { useEffect, useRef, useState } from "react";
import "../css/pages/notepage.css";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomSheet from "../components/BottomSheet";
import Tambah from "../components/Tambah";
import NoteComp from "../components/NoteComp";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import TambahNoteBox from "../components/TambahNoteBox";
import NoteBox from "../components/NoteBox";

export const NotePage = ({ refresh, setRefresh }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef(null);
  axios.defaults.withCredentials = true;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    axios
      .get("https://apicatetin.rakhawibowo.my.id/profile")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setUsername(response.data.username);
          axios
            .get("https://apicatetin.rakhawibowo.my.id/note", {
              params: {
                user: response.data.username,
              },
            })
            .then((res) => {
              setData(res.data);
              setLoading(false);
              setRefresh(false);
            });
        } else if (response.data.loggedIn === false) {
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [loading, navigate, refresh, setRefresh]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="notepage">
        <div className="notepage__container">
          <Navbar
            location={"/note"}
            bottomSheetRef={bottomSheetRef}
            username={capitalizeFirstLetter(username)}
          />
          {data.length === 0 ? (
            <div className="notepage__kosong">
              <p>Belum ada catatan...</p>
            </div>
          ) : (
            <div className="notepage__list">
              {data.map((v, i) => {
                return <NoteComp judul={v.judul} key={i} data={v} />;
              })}
            </div>
          )}
        </div>
        <Tambah />
        <TambahNoteBox username={username} />
        <NoteBox username={username} />
        <BottomSheet ref={bottomSheetRef} />
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    refresh: state.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRefresh: (data) => dispatch({ type: "SET_REFRESH", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
