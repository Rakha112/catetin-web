import React from "react";
import CatetinLogo from "../images/CATETIN2.png";
import "../css/components/navbar.css";
import Button from "./Button";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={CatetinLogo} alt="logo" />
        <h1>Catetin</h1>
      </div>
      <div className="navbar__button">
        <Button buttonText={"Log In"} />
        <Button buttonText={"Sign Up"} />
      </div>
    </div>
  );
};

export default Navbar;
