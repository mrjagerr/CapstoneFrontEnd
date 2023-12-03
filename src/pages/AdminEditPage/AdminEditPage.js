import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import TeamMemberSelect from "../../components/TeamMemberSelectCard/TeamMemberSelect";
import PostShift from "../../components/PostShift/PostShift";
import DragAndDrop from "../../components/DragAndDropTeamMember/DragAndDropTeamMember";
import "./AdminEditPage.css";



const AdminEditPage = () => {
  const [user, token] = useAuth();

  const [shifts, setShifts] = useState([]);
  const [currentDaysProject, setCurrentDaysproject] = useState([]);
  const [todaysShifts, setTodaysShifts] = useState([]);
  const [dateSearch, setDateSearch] = useState();

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
  console.log(dateSearch)
  console.log(currentDaysProject);
  console.log(shifts);
  console.log(todaysShifts);
  
  return (
    <div className="editpage">
   
      <div className="editbox">
       
      
     
      </div>

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
      {currentDaysProject &&
        currentDaysProject.map((todaysProjects) => (
          <div className="editbox" key={todaysProjects.id}>
            <p>{todaysProjects.projectName}</p>
            <p> {todaysProjects.projectDate}</p>
            <p> {todaysProjects.workLoadAllocation}</p>
            <p> {todaysProjects.totalWorkloadRequired}</p>
          </div>
        ))}
      {todaysShifts &&
        todaysShifts.map((todaysShifts) => (
          <div key={todaysShifts.id}>
            <p> {todaysShifts.teamMemberFirstName} </p>
            <p> {todaysShifts.shiftDuration} hrs</p>
            <p> {todaysShifts.outOfStock} OOS</p>
            <p> {todaysShifts.priorityFill} Pf</p>
            <p> {todaysShifts.zone} </p>
            <p>{todaysShifts.workLoadValue}</p>
          </div>
        ))}

      <div></div>
    </div>
  );
};

export default AdminEditPage;
