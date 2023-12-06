import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import PostShift from "../../components/PostShift/PostShift";

import DragAnddDropTmShiftCard from "../../components/TeamMemberTaskList/TeamMemberTaskList";
import "./AdminEditPage.css";

const AdminEditPage = () => {
  const [user, token] = useAuth();

  const [shifts, setShifts] = useState([]);
  const [currentDaysProject, setCurrentDaysproject] = useState([]);
  const [todaysShifts, setTodaysShifts] = useState([]);
  const [dateSearch, setDateSearch] = useState();
  const [valueEnd, setValueEnd] = useState(currentDaysProject.workloadCompleted);
  useEffect(() => {
    fetchTeamMember();
    fetchCurrentWorkDay();
    fetchShifts();
  }, [token]);

  const fetchTeamMember = async () => {
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
  const fetchShifts = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/shifts/${dateSearch}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTodaysShifts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchCurrentWorkDay = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/projects/CurrentDaysProjects/${dateSearch}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setCurrentDaysproject(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchShifts();
    fetchCurrentWorkDay();
  };
  console.log(dateSearch);
  console.log(currentDaysProject);
  console.log(shifts);
  console.log(todaysShifts);

  return (
    <div className="editpage ">
      <div>
        <div className="editbox"></div>

        <div>
          {" "}
          <PostShift />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            defaultValue="2023-12-01"
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
            type="date"
            id="search"
          ></input>
          <button type="submit" className="searchButton">
            {" "}
            Search Shift{" "}
          </button>
        </form>
      </div>
      <div className="displayPage">
        <h1>Todays Project</h1>
        {currentDaysProject &&
          currentDaysProject.map((todaysProjects) => (
            <div className="editCard">
              <div className="editbox" key={todaysProjects.id}>
                <p>{todaysProjects.projectName}</p>
                <p> {todaysProjects.projectDate}</p>
                <p> {todaysProjects.workLoadAllocation}</p>
                <p> {todaysProjects.totalWorkloadRequired}</p>
              </div>
            </div>
          ))}
        <h2>Todays SHifts</h2>
        {todaysShifts &&
          todaysShifts.map((todaysShifts) => (
            <div className="editCard">
              <div key={todaysShifts.id}>
                <p>
                  {" "}
                  <label> Tm : </label> {todaysShifts.teamMemberFirstName}{" "}
                </p>
                <p>
                  {" "}
                  <label> Shift: </label> {todaysShifts.shiftDuration} hrs
                </p>
                <p>
                  {" "}
                  <label> Oos : </label> {todaysShifts.outOfStock} OOS
                </p>
                <p>
                  {" "}
                  <label> PF: </label> {todaysShifts.priorityFill} Pf
                </p>
                <p>
                  {" "}
                  <label> Zone: </label> {todaysShifts.zone}{" "}
                </p>
                <p>
                  {" "}
                  <label> WorkLoad Value : </label> {todaysShifts.workLoadValue}
                </p>
              </div>
            </div>
          ))}
        <div></div>
      </div>
    </div>
  );
};

export default AdminEditPage;
