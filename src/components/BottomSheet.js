import React from "react";
import { connect } from "react-redux";
import Button from "./Button";
import "../css/components/bottomsheet.css";
const BottomSheet = (props) => {
  return (
    <div className="bottomsheet">
      <div
        className="bottomsheet__backdrop"
        onClick={() => {
          console.log("BACKDROP KLIK");
        }}
      />
      <div className="bottomsheet__isi">
        <Button buttonText={"Log Out"} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheet);
