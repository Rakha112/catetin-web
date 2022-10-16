import LandingPage from "./pages/LandingPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotePage from "./pages/NotePage";
function App() {
  const initialState = {
    loginBox: false,
    signupBox: false,
    tambahBox: false,
    noteBox: false,
    refresh: false,
    dataNote: { judul: "", isi: "" },
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_BOX":
        return {
          ...state,
          loginBox: action.payload,
        };
      case "SIGNUP_BOX":
        return {
          ...state,
          signupBox: action.payload,
        };
      case "TAMBAH_BOX":
        return {
          ...state,
          tambahBox: action.payload,
        };
      case "NOTE_BOX":
        return {
          ...state,
          noteBox: action.payload,
        };
      case "SET_REFRESH":
        return {
          ...state,
          refresh: action.payload,
        };
      case "SET_DATA_NOTE":
        return {
          ...state,
          dataNote: action.payload,
        };
      default:
        return state;
    }
  };

  const store = configureStore({ reducer: rootReducer });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
