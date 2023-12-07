import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PostShift = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [workloadAllocation, setWorkloadAllocation] = useState(Number);
  const [totalWorkloadRequired, setTotalWorkloadRequired] = useState(Number);
  const [workloadCompleted, setWorkloadCompleted] = useState(Number);
  const [user, token] = useAuth();

  useEffect(() => {}, [token]);

  async function addProject() {
    axios.post(
      "https://localhost:5001/api/projects",
      {
        projectName: projectName,
        workLoadAllocation: workloadAllocation,
        totalWorkloadRequired: totalWorkloadRequired,
        projectDate: projectDate,
        workloadCompleted: workloadCompleted,
        ownerId: user.id,
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
    let newProject = {};
    {
      console.log(newProject);
    }
    addProject(newProject);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Project Name :</label>
        <input
          Droppable="true"
          type="text"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          id="projectName"
        />
        <label> Project Date :</label>
        <input
          Droppable="true"
          type="date"
          value={projectDate}
          onChange={(event) => setProjectDate(event.target.value)}
          id="projectName"
        />
        <label> WorkLoad Allocation :</label>
        <input
          Droppable="true"
          type="number"
          value={workloadAllocation}
          onChange={(event) => setWorkloadAllocation(event.target.value)}
          id="workloadallocation"
        />
        <label> Total Workload Required :</label>
        <input
          Droppable="true"
          type="text"
          value={totalWorkloadRequired}
          onChange={(event) => setTotalWorkloadRequired(event.target.value)}
          id="projectName"
        />
        <label> Workload Completed :</label>
        <input
          Droppable="true"
          type="text"
          value={workloadCompleted}
          onChange={(event) => setProjectName(event.target.value)}
          id="projectName"
        />
        <button type="submit" className="buttonDetails">
          Post Project
        </button>
      </form>
    </div>
  );
};

export default PostShift;
