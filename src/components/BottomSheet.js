import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import Button from "./Button";
import "../css/components/bottomsheet.css";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BottomSheet = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const bottomSheetRef = useRef(null);
  const bottomSheetIsiRef = useRef(null);
  const backdropRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(bottomSheetIsiRef.current, {
      y: "100%",
    });
    gsap.set(backdropRef.current, {
      opacity: 0,
    });
    gsap.set(bottomSheetRef.current, {
      display: "none",
      zIndex: -999,
    });
  }, []);
  const expand = useCallback(() => {
    gsap.set(bottomSheetRef.current, {
      display: "block",
      zIndex: 1,
      onComplete: () => {
        gsap.to(bottomSheetIsiRef.current, {
          y: 0,
          duration: 0.5,
        });
        gsap.to(backdropRef.current, {
          opacity: 0.5,
          duration: 0.5,
        });
      },
    });
  }, []);
  const close = useCallback(() => {
    gsap.to(bottomSheetIsiRef.current, {
      y: "100%",
      duration: 0.5,
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.to(bottomSheetRef.current, {
          display: "none",
          zIndex: -999,
        });
      },
    });
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );
  const logOut = () => {
    axios
      .get("https://apicatetin.rakhawibowo.my.id/logout")
      .then((response) => {
        if (response.data.logout === true) {
          navigate("/");
        }
      });
  };
  return (
    <div className="bottomsheet" ref={bottomSheetRef}>
      <div
        className="bottomsheet__backdrop"
        ref={backdropRef}
        onClick={() => {
          close();
        }}
      />
      <div className="bottomsheet__isi" ref={bottomSheetIsiRef}>
        <Button buttonText={"Log Out"} klik={logOut} type={"hitam"} />
      </div>
    </div>
  );
});

export default BottomSheet;
