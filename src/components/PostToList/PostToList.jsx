import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";






const PostToList = () => {
    const [goal, setGoal] = useState("");
    const [goalAssignedTo, setGoalAssignedTo] = useState();
  
    const [user, token] = useAuth();


    useEffect(() => {
        
      }, [token]);


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
      }
    
    return (
      <div>
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
            type="text"
            value={goalAssignedTo}
            onChange={(event) => setGoalAssignedTo(event.target.value)}
            id="ShiftDuration"
          />
          <button type="submit" className="buttonDetails">
            Post Task
          </button>
        </form>
      </div>
    );
}
 
export default PostToList;