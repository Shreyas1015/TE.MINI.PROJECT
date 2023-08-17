import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const uid = new URLSearchParams(location.search).get("uid");
  const [adminID, setAdminID] = useState("");

  useEffect(() => {
    async function fetchAdminID() {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_admin_id?uid=${uid}`
        );
        const fetchedAdminID = response.data.admin_id;
        setAdminID(fetchedAdminID);
      } catch (error) {
        console.error("Error fetching admin_id:", error);
        // Handle error
      }
    }
    fetchAdminID();
  }, [uid]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    alert("Logged Out Successfully");
  };

  return (
    <>
      {/* My Profile */}
      <ul className="m-4 p-0" style={{ listStyle: "none" }}>
        <Link className="text-decoration-none" to={`/adminprofile?uid=${uid}`}>
          <li className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3">
            <i className="fa-solid fa-layer-group" /> My Profile
          </li>
        </Link>
        {/* Render the Dashboard link only if adminID is available */}
        {adminID && (
          <Link
            className="text-decoration-none"
            to={`/dashboard?uid=${uid}&admin_id=${adminID}`}
          >
            <li className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3">
              <i className="fa-solid fa-layer-group" /> Dashboard
            </li>
          </Link>
        )}
        {/* Construct the Add Post link only if adminID is available */}
        {adminID && (
          <Link
            className="text-decoration-none"
            to={`/addpost?uid=${uid}&admin_id=${adminID}`}
          >
            <li className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3">
              <i className="fa-solid fa-layer-group" /> Add Post
            </li>
          </Link>
        )}
        <li
          className="py-3 px-3 sidebar-li my-2 blue-buttons rounded-3"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
        </li>
      </ul>
    </>
  );
};

export default AdminSidebar;
