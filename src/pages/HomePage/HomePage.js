import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [projects, setprojects] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchShifts();
  }, [token]);

  const fetchProjects = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/projects/CurrentDaysProjects/2023-11-23",
        {
          
        }
      );
      setprojects(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchShifts = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/shifts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setShifts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  console.log(projects);
  console.log(shifts);
  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.userName}!</h1>
      {projects &&
        projects.map((projects) => (
          <div key={projects.id}>
            <p>{projects.projectName}</p>
            <p> {projects.projectDate}</p>
            <p> {projects.totalWorkloadRequired} </p>
            <p> {projects.workLoadAllocation}</p>
          </div>
        ))}
      {shifts &&
        shifts.map((shift) => (
          <div key={shift.id}>
            <p> {shift.teamMemberFirstName}</p>
            <p> {shift.shiftDuration} Hrs</p>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
