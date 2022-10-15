import React from "react";
import "../css/components/loader.css";
import CatetinIcon from "../images/CATETIN2.png";
const Loader = () => {
  return (
    <div className="loader">
      <img src={CatetinIcon} alt="catetin-icon" />
      <h1>CATETIN</h1>
    </div>
  );
};

export default Loader;
