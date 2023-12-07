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
        <h2> {user?.firstName} </h2>

        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
      <ul>

      </ul>
      <ul>
        <li>
        <Link
         className="navLinks"
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Home </b>
          </Link>
          <Link
            className="navLinks"
            to="/AdminEditPage"
            style={{ textDecoration: "none", color: "white" }}
          >    
            <b> Manage </b>
          </Link>

          <Link
            to="/AssignmentViewPage"
            className="navLinks"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Profile</b>
          </Link>
          <Link
            to="/TmPerformanceViewPage"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Performance</b>
          </Link>
         
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
