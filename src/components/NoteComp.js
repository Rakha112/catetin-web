import React from "react";
import "../css/components/notecomp.css";
import NoteIcon from "../icons/note.svg";
const NoteComp = ({ judul }) => {
  return (
    <div className="notecomp">
      <div className="icon">
        <img src={NoteIcon} alt="note-icon" />
      </div>
      <h1>{judul}</h1>
    </div>
  );
};

export default NoteComp;
