import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AssignmentViewPage = () => {

  const [todaysShifts, setTodaysShifts] = useState([]);
  const [user, token] = useAuth();
  const [dateSearch, setDateSearch] = useState();






  useEffect(() => {
    
    
    fetchShifts();
  }, [token]);
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
  const handleSubmit = (event) => {
    event.preventDefault();
 fetchShifts();
  };
  return (
  
  
  <div> 
    <h1>Home Page for {user.userName}!</h1>
    
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
    
    {todaysShifts &&
    todaysShifts.map((todaysShifts) => (<div className="editCard">
      <div key={todaysShifts.id}>
        <p> <label> Tm : </label> {todaysShifts.teamMemberFirstName} </p>
        <p> <label> Shift: </label> {todaysShifts.shiftDuration} hrs</p>
        <p> <label> Oos : </label> {todaysShifts.outOfStock} OOS</p>
        <p> <label> PF: </label> {todaysShifts.priorityFill} Pf</p>
        <p> <label> Zone: </label> {todaysShifts.zone} </p>
        <p> <label> WorkLoad Value : </label> {todaysShifts.workLoadValue}</p>
      </div></div>
    ))}</div>
);
};

export default AssignmentViewPage;
