import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import TeamMemberTaskList from "../../components/TeamMemberTaskList/TeamMemberTaskList";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Homepage.css";
import { easeQuadInOut } from "d3-ease";
import ProgressProvider from "../../hooks/ProgressProvider";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [projects, setprojects] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [dateSearch, setDateSearch] = useState();
  const [updateProjectName, setUpdateProjectName] = useState("");
  const [ workLoadUpdate, setWorkLoadUpdate] = useState();
  const [updateDate, setUpdateDate] = useState("");
 const [projectId, setProjectId] = useState();
 
  useEffect(() => {
    fetchProjects();
    fetchShifts();
    updateProject();
    fetchProjects();
    

    
  }, [token]);

 
 
  const fetchProjects = async () => {
    try {
      let response = await axios.get(
        `https://localhost:5001/api/projects/CurrentDaysProjects/${dateSearch}`,
        {}
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
  }; const updateProject = async () => {
    try {
      await axios.patch(
        `https://localhost:5001/api/projects/${projectId}`,
        {
         
          workloadCompleted: workLoadUpdate,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchShifts();
    fetchProjects();
  };
  const handleUpdate = (event) =>{
    event.preventDefault();

    fetchProjects();
    updateProject()
    fetchProjects();
  };
 

  
  return (
    <div className="pageView">
    <div className="container"><h1>Home Page for {user.userName}!</h1>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue="2023-12-01"
          value={dateSearch}
          onChange={(e) => setDateSearch(e.target.value) && setUpdateDate(e.target.value) && setUpdateProjectName(projects.projectName)}
        
          type="date"
          id="search"
        ></input>
        <button type="submit" className="searchButton">
          {" "}
          Search Shift{" "}
        </button>
      </form>
      {console.log(user)}
      
      {projects &&
        projects.map((projects) => (
          <div key={projects.id}>
            <p> Todays Project: {projects.projectName}</p>
            <p> Date: {projects.projectDate}</p>
            <p> Total Workload : {projects.totalWorkloadRequired} </p>
            <p> Hours Allocated :{projects.workLoadAllocation}</p>
            <p> WorkLoad Completed :{projects.workLoadCompleted}</p>
            <p></p>
            <ProgressProvider
              valueStart={0}
              valueEnd={projects.percentCompleted}
            >
              {(value) => (
                <CircularProgressbar value={value} text={`${value} %`} />
              )}
            </ProgressProvider>
          </div>
        ))}
      <div  >
        <form onSubmit={handleUpdate}  >
          {projects &&
            projects.map((projects) => (
              <div className="updateFields" key={projects.id}>
                <label className="updateFields2"> Project Being Edited :</label>
               <select className="updateFields1" onChange={(e) => setProjectId(e.target.value) }  onSelectCapture={(e) =>setUpdateProjectName(projects.projectName)}>
                {console.log(updateDate)}
                {console.log(updateProjectName)}

                <option> Please Choose a Project To update</option>
                <option key ={projects.id} value={projects.id} >
                {projects.projectName} {""}
                {projects.projectDate}


                   </option>
               </select>
                <input
                className="updateFields"
                type="number"
                value={workLoadUpdate}
                onChange={(e) => setWorkLoadUpdate(e.target.value)}>
                </input>
                <button type="submit" className="searchButton">
                  {" "}
                  Update WorkLoad{" "}
                </button>
              </div>
            ))}
        </form>
      </div>
</div>
      <TeamMemberTaskList />
    </div>
  );
};

export default HomePage;
