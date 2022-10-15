import React from "react";
import { connect } from "react-redux";
import "../css/components/tambah.css";
import TambahIcon from "../icons/plus.png";
const Tambah = ({ setTambahBox }) => {
  return (
    <div
      className="tambah"
      onClick={() => {
        setTambahBox(true);
      }}
    >
      <button>
        <div className="icon">
          <img src={TambahIcon} alt="tambah-icon" />
        </div>
      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTambahBox: (data) => dispatch({ type: "TAMBAH_BOX", payload: data }),
  };
};
export default connect(null, mapDispatchToProps)(Tambah);
