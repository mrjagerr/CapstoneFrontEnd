import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import SearchShiftByDate from "../SearchShiftByDate/SearchShiftByDate";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>ProjectManagment App</b>
          </Link>
        
        </li>
        <li>
        <Link to="/AdminEditPage" style={{ textDecoration: "none", color: "white" }}>
            <b> Shifts </b>
          </Link>
          <Link to="/AssignmentViewPage" style={{ textDecoration: "none", color: "white" }}>
            <b>Profile</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>

    </div>
  );
};

export default Navbar;
