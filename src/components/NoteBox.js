import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../css/components/box.css";
import Close from "../icons/plus.png";
import Button from "./Button";
import gsap from "gsap";
import SnackBar from "./SnackBar";
import axios from "axios";
const NoteBox = ({ noteBox, setNoteBox, username, setRefresh, dataNote }) => {
  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = useState(false);
  const [snackbarPesan, setSnackbarPesan] = useState("");
  const [severity, setSeverity] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [edit, setEdit] = useState(false);
  const noteBoxRef = useRef(null);
  const backdropRef = useRef(null);
  axios.defaults.withCredentials = true;
  gsap.config({ force3D: true });

  useEffect(() => {
    setJudul(dataNote.judul);
    setIsi(dataNote.isi);
  }, [dataNote.isi, dataNote.judul]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleDelete = () => {
    if (edit) {
      setSnackbarPesan("Tidak dapat menghapus catatan dalam keadaan Edit");
      setSeverity("error");
      setOpen(true);
    } else {
      axios
        .delete("https://apicatetin.rakhawibowo.my.id/note/delete", {
          data: {
            judul: judul,
            isi: isi,
            user: username,
          },
        })

        .then(() => {
          setSnackbarPesan("Berhasil menghapus catatan");
          setSeverity("success");
          setOpen(true);
          setRefresh(true);
          setTimeout(() => {
            gsap.to(backdropRef.current, {
              duration: 0.5,
              opacity: 0,
              ease: "Power3.easeOut",
            });
            gsap.to(noteBoxRef.current, {
              duration: 0.5,
              opacity: 0,
              y: 40,
              ease: "Power3.easeOut",
              onComplete: () => {
                setNoteBox(false);
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

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    if (judul === "" || isi === "") {
      setSnackbarPesan("Form tidak boleh kosong");
      setSeverity("warning");
      setOpen(true);
    } else {
      axios
        .put("https://apicatetin.rakhawibowo.my.id/note/update", {
          judul: dataNote.judul,
          judulBaru: judul,
          isi: isi,
          user: username,
        })
        .then(() => {
          setSnackbarPesan("Berhasil menyimpan perubahan catatan");
          setSeverity("success");
          setOpen(true);
          setRefresh(true);
          setTimeout(() => {
            gsap.to(backdropRef.current, {
              duration: 0.5,
              opacity: 0,
              ease: "Power3.easeOut",
            });
            gsap.to(noteBoxRef.current, {
              duration: 0.5,
              opacity: 0,
              y: 40,
              ease: "Power3.easeOut",
              onComplete: () => {
                setNoteBox(false);
                setEdit(false);
                setJudul("");
                setIsi("");
              },
            });
          }, 2000);
        });
    }
  };
  console.log(dataNote);
  useLayoutEffect(() => {
    if (noteBox) {
      gsap.set(noteBoxRef.current, {
        opacity: 0,
        y: 40,
      });
      gsap.set(backdropRef.current, {
        opacity: 0,
      });
      gsap.to(noteBoxRef.current, {
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
  }, [noteBox]);

  return (
    <div className={noteBox ? "box aktif" : "box"}>
      <div className="box__backdrop" ref={backdropRef} />
      <div className="box__container" ref={noteBoxRef}>
        <div className="box__atas">
          <form action="">
            <input
              type="text"
              placeholder="Judul..."
              onChange={(e) => {
                setJudul(e.target.value);
              }}
              value={judul}
              readOnly={edit ? false : true}
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
              gsap.to(noteBoxRef.current, {
                duration: 0.5,
                opacity: 0,
                y: 40,
                ease: "Power3.easeOut",
                onComplete: () => {
                  setNoteBox(false);
                  setEdit(false);
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
              readOnly={edit ? false : true}
            />
          </form>
          <p>
            {dataNote.status} {dataNote.tgl_edit}
          </p>
          <Button
            buttonText={edit ? "Save" : "Edit"}
            klik={edit ? handleSave : handleEdit}
            type={"hitam"}
          />
          <Button buttonText={"Delete"} klik={handleDelete} type={"putih"} />
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
    noteBox: state.noteBox,
    dataNote: state.dataNote,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setNoteBox: (data) => dispatch({ type: "NOTE_BOX", payload: data }),
    setRefresh: (data) => dispatch({ type: "SET_REFRESH", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteBox);
