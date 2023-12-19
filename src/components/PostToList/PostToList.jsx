import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";

const PostToList = ({ onNewTask }) => {
  const [goal, setGoal] = useState("");
  const [goalAssignedTo, setGoalAssignedTo] = useState();
  const [user, token] = useAuth();

  useEffect(() => {}, [token]);

  async function addTask() {
    axios.post(
      "https://localhost:5001/api/Tasks",
      {
        goal: goal,
        goalAssignedTo: goalAssignedTo,
        user: user,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    if (event.status === 403) {
      alert("succesfull");
    }
    let newshift = {};
    {
      console.log(newshift);
    }
    addTask(newshift);
    onNewTask();
    
  }

  return (
    <div className="buttonSizing">
      <form onSubmit={handleSubmit}>
        <label> Task :</label>
        <input
          Droppable="true"
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          id="teamMemberFirstName"
        />
        <label> Assigned To :</label>
        <input
        className="input"
          type="text"
          value={goalAssignedTo}
          onChange={(event) => setGoalAssignedTo(event.target.value)}
          id="ShiftDuration"
        />
        <Button type="submit"  variant="contained">
          Post Task
        </Button>
      </form>
    </div>
  );
};

export default PostToList;
