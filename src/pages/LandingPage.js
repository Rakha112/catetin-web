import React from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import "../css/pages/landingpage.css";
import Gambar from "../images/CATETIN.png";
const LandingPage = () => {
  return (
    <div className="landingpage">
      <Navbar />
      <div className="landingpage__container">
        <div className="landingpage__gambar">
          <img src={Gambar} alt="Gambar Catetin" />
        </div>
        <div className="landingpage__text">
          <h1>Tempat Untuk Mencatat</h1>
          <p>
            CATETIN merupakan tempat untuk menulis dan mencatat apapun yang
            ingin anda tulis dan catat
          </p>
          <div className="landingpage__button">
            <Button buttonText={"Sign Up"} />
            <Button buttonText={"Log In"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
