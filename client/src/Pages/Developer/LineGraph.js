import { Link, useLocation, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import DeveloperSidebar from "../../Components/Developer/DeveloperSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import TitleAndLogout from "../../Components/Developer/TitleAndLogout";
import LineGraph from "../../Components/Developer/LineGraph";

const Linegraph = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = new URLSearchParams(location.search).get("uid");
  const [userData, setUserData] = useState([]);
  console.log("UserId: ", uid);

  const BackToLogin = () => {
    navigate("/");
  };

  const storedToken = localStorage.getItem("token");

  if (!uid) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>INVALID URL. Please provide a valid UID.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }
  if (!token) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>You must be logged in to access this page.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#272727", minHeight: "100vh" }}
      >
        <div
          className="col-lg-2 col-md-2 col-sm-3 col-3 sidebar z-2"
          style={{
            backgroundColor: "#272727",
            height: "auto",
            position: "fixed",
          }}
        >
          {/* Sidebar */}
          <DeveloperSidebar />
        </div>
        <div className="row">
          {/* Analysis */}
          <div className="col-lg-2"></div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-9 px-4">
            <TitleAndLogout title="Line Graph" />
            <hr className="my-3 p-0" style={{ color: "white" }} />
            <div
              className="container glassomorphic-effect rounded-4 p-3"
              style={{ height: "100vh" }}
            >
              <LineGraph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Linegraph;
