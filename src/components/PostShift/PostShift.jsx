import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DragAnddDropTmShiftCard from "../../components/DragAndDropTMShiftCard/DragAnddDropTmShiftCard";




const PostShift = (props) => {
  const [teamMemberFirstName, setTeamMemberFirstName] = useState("");
  const [shiftDuration, setShiftDuration] = useState(Number);
  const [departmentName, setDepartmentName] = useState("");
  const [shiftDate, setShiftDate] = useState(Date);
  const [workloadValue, setWorkLoadValue] = useState(Number);
  const [priorityFill, setPriorityFill] = useState(Number);
  const [outOfStocks, setOutOfStocks] = useState(Number);
  const [zone, setZone] = useState("");
  const [projectId, setProjectId] = useState(Number);
  const [user, token] = useAuth();
  const [searchProject, setSearchProject] = useState([]);


  useEffect(() => {
    fetchProjects();
  }, [token]);
  async function addShift() {
    axios.post(
      "https://localhost:5001/api/shifts",
      {
        teamMemberFirstName: teamMemberFirstName,
        shiftDuration: shiftDuration,
        departmentName: departmentName,
        shiftDate: shiftDate,
        workLoadValue: workloadValue,
        priorityFill: priorityFill,
        outOfStock: outOfStocks,
        zone: zone,
        projectId: projectId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  const fetchProjects = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/projects", {});
      setSearchProject(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
 
  function handleSubmit(event) {
    event.preventDefault();

    let newshift = {};
    {
      console.log(newshift);
    }
    addShift(newshift);
  }

  return (
    <div>
      <div>
      {console.log(props)}
      </div>
     
      
      <form onSubmit={handleSubmit}>
       
      <label> TeamMember :</label>
        <input
        
          Droppable ="true"
          type="text"
          value={teamMemberFirstName}
        
          onChange={(event) => setTeamMemberFirstName(event.target.value)}
          id="teamMemberFirstName"
        />
        <label> Shift Length :</label>
        <input
          type="number"
          value={shiftDuration}
          onChange={(event) => setShiftDuration(event.target.value)}
        />
        <label> Department Name :</label>
        <input
          type="text"
          onChange={(event) => setDepartmentName(event.target.value)}
        />
        <label> Shift Date:</label>
        <input
          type="date"
          onChange={(event) => setShiftDate(event.target.value) } 
          defaultValue="2023-12-01"
        />
        <label> Workload Value:</label>
        <input
          type="number"
          onChange={(event) => setWorkLoadValue(event.target.value)}
        />
        <label> Priority Fill:</label>
        <input
          type="number"
          onChange={(event) => setPriorityFill(event.target.value)}
        />
        <label> Out Of Stocks:</label>
        <input
          type="number"
          onChange={(event) => setOutOfStocks(event.target.value)}
        />
        <label> Zone:</label>
        <input type="text" onChange={(event) => setZone(event.target.value)} />
        <label> Project :</label>

        <select onChange={(e) => setProjectId(e.target.value)}>
          <option >Please choose a project  </option>
          {searchProject &&
            searchProject.map((project) => (
              <option key={project.id}  value={project.id} >
           
                {project.projectName} {""}{project.projectDate}
             
             
              </option>
            ))}{" "}
        </select>
                
        <button type="submit" className="buttonDetails">
          Post Shift
        </button>
      </form>
    </div>
  );
};

export default PostShift;
