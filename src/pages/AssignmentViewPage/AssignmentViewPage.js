import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import './AssignmentViewPage.css'

const AssignmentViewPage = () => {
  const [todaysShifts, setTodaysShifts] = useState([]);
  const [user, token] = useAuth();
  const [dateSearch, setDateSearch] = useState();
  const [myshifts, setMyShifts] = useState();

  useEffect(() => {
    fetchMyShifts();

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
      console.log(todaysShifts);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchMyShifts = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/shifts/myShifts/${user.firstName}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMyShifts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchShifts();
  };

  return (
    <div className="containerView">
      {" "}
      {console.log(user)}
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
        <input type="hidden"></input>
      </form>
      <div className="shifts">
        {myshifts &&
          myshifts.map((myShifts) => (
            <div key={myShifts.id}>
              <h1> {myShifts.shiftDate}</h1>
              <p>
                {" "}
                <label> Tm : </label> {myShifts.teamMemberFirstName}{" "}
              </p>
              <p>
                {" "}
                <label> Shift: </label> {myShifts.shiftDuration} hrs
              </p>
              <p>
                {" "}
                <label> Oos : </label> {myShifts.outOfStock} OOS
              </p>
              <p>
                {" "}
                <label> PF: </label> {myShifts.priorityFill} Pf
              </p>
              <p>
                {" "}
                <label> Zone: </label> {myShifts.zone}{" "}
              </p>
              <p>
                {" "}
                <label> WorkLoad Value : </label> {myShifts.workLoadValue}
              </p>
            </div>
          ))}
      </div>
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
    </div>
  );
};

export default AssignmentViewPage;
