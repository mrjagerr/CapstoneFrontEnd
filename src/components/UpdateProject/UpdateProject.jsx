import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import './UpdateProject.css'

const UpdateProject = () => {
    const [projectName, setProjectName] = useState("");
    const [projectDate, setProjectDate] = useState("");
    const [workloadAllocation, setWorkloadAllocation] = useState(Number);
    const [totalWorkloadRequired, setTotalWorkloadRequired] = useState(Number);
    const [workloadCompleted, setWorkloadCompleted] = useState(Number);
  const [projectId, setProjectId] = useState();
  const [projects, setprojects] = useState([]);
  const [user, token] = useAuth();


  useEffect(() => {
   fetchProjects()
  }, [token]);

  const updateProject = async () => {
    try {
      await axios.put(
        `https://localhost:5001/api/projects/edit/${projectId}`,
        {
            projectName: projectName,
            workLoadAllocation: workloadAllocation,
            totalWorkloadRequired: totalWorkloadRequired,
            projectDate: projectDate,
            
          
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    
      
      
      
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchProjects = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/projects`,
        {}
      );
      setprojects(response.data);
      
      
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleUpdate = (event) =>{
    event.preventDefault();
    fetchProjects();
    updateProject()
    fetchProjects();
  };
  return (
    <div className="updateProject"><h2> Update</h2>
      {" "}
      <form onSubmit={handleUpdate}>
      <li>
          <label> Project :</label>
          <select onChange={(e) => setProjectId(e.target.value)}>
            <option>Please choose a project </option>
            {projects &&
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.projectName} {""}
                  {project.projectDate}
                </option>
              ))}{" "}
          </select>
        </li> 
        <li> <label> Project Name :</label>
        
        <input
         
          type="text"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          id="projectName"
        /></li>
        <li><label> Project Date :</label>
        <input
         
          type="date"
          value={projectDate}
          onChange={(event) => setProjectDate(event.target.value)}
          id="projectName"
        /></li>
       <li> <label> WorkLoad Allocation (% complete) :</label>
        <input
          
          type="number"
          max= "100"
          value={workloadAllocation}
          onChange={(event) => setWorkloadAllocation(event.target.value)}
          id="workloadallocation"
        /></li>
       <li> <label> Total Workload Required(PF) :</label>
        <input
         
          type="number"
          min="300"
          value={totalWorkloadRequired}
          onChange={(event) => setTotalWorkloadRequired(event.target.value)}
          id="projectName"
        /></li>
       
        
        
        
        <button type="submit" className="searchButton">
                {" "}
                Update {" "}
              </button>
      </form>
    </div>
  );
};

export default UpdateProject;
