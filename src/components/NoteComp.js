import React from "react";
import { connect } from "react-redux";
import "../css/components/notecomp.css";
import NoteIcon from "../icons/note.svg";
const NoteComp = ({ judul, setNoteBox, data, setDataNote }) => {
  return (
    <div
      className="notecomp"
      onClick={() => {
        setNoteBox(true);
        setDataNote(data);
      }}
    >
      <div className="icon">
        <img src={NoteIcon} alt="note-icon" />
      </div>
      <h1>{judul}</h1>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setNoteBox: (data) => dispatch({ type: "NOTE_BOX", payload: data }),
    setDataNote: (data) => dispatch({ type: "SET_DATA_NOTE", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(NoteComp);
