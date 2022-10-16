import React, { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
import SnackBar from "./SnackBar";
import axios from "axios";
const TambahNoteBox = ({ tambahBox, setTambahBox, username, setRefresh }) => {
  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = useState(false);
  const [snackbarPesan, setSnackbarPesan] = useState("");
  const [severity, setSeverity] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const tambahBoxRef = useRef(null);
  const backdropRef = useRef(null);
  axios.defaults.withCredentials = true;
  gsap.config({ force3D: true });
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    if (judul === "" || isi === "") {
      setSnackbarPesan("Form tidak boleh kosong");
      setSeverity("warning");
      setOpen(true);
    } else {
      axios
        .post("https://apicatetin.rakhawibowo.my.id/note/insert", {
          judul: judul,
          isi: isi,
          user: username,
        })
        .then(() => {
          setSnackbarPesan("Berhasil menambah catatan");
          setSeverity("success");
          setOpen(true);
          setRefresh(true);
          setTimeout(() => {
            gsap.to(backdropRef.current, {
              duration: 0.5,
              opacity: 0,
              ease: "Power3.easeOut",
            });
            gsap.to(tambahBoxRef.current, {
              duration: 0.5,
              opacity: 0,
              y: 40,
              ease: "Power3.easeOut",
              onComplete: () => {
                setTambahBox(false);
                setJudul("");
                setIsi("");
              },
            });
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  useLayoutEffect(() => {
    if (tambahBox) {
      gsap.set(tambahBoxRef.current, {
        opacity: 0,
        y: 40,
      });
      gsap.set(backdropRef.current, {
        opacity: 0,
      });
      gsap.to(tambahBoxRef.current, {
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
  }, [tambahBox]);

  return (
    <div className={tambahBox ? "box aktif" : "box"}>
      <div className="box__backdrop" ref={backdropRef} />
      <div className="box__container" ref={tambahBoxRef}>
        <div className="box__atas">
          <form action="">
            <input
              type="text"
              placeholder="Judul..."
              onChange={(e) => {
                setJudul(e.target.value);
              }}
              value={judul}
            />
          </form>
          <img
            src={Close}
            alt="close"
            onClick={() => {
              gsap.to(backdropRef.current, {
                duration: 0.5,
                opacity: 0,
                ease: "Power3.easeOut",
              });
              gsap.to(tambahBoxRef.current, {
                duration: 0.5,
                opacity: 0,
                y: 40,
                ease: "Power3.easeOut",
                onComplete: () => {
                  setTambahBox(false);
                  setJudul("");
                  setIsi("");
                },
              });
            }}
          />
        </div>
        <div className="box__bawah">
          <form action="">
            <textarea
              name="note"
              id="note"
              placeholder="Isikan note di sini..."
              onChange={(e) => {
                setIsi(e.target.value);
              }}
              value={isi}
            />
          </form>
          <Button buttonText={"Save"} klik={handleSubmit} type={"hitam"} />
        </div>
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
    tambahBox: state.tambahBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTambahBox: (data) => dispatch({ type: "TAMBAH_BOX", payload: data }),
    setRefresh: (data) => dispatch({ type: "SET_REFRESH", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TambahNoteBox);
