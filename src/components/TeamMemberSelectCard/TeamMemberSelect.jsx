import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const TeamMemberSelect = () => {
    const [user, token] = useAuth();
    const [teamMember,setTeamMember] = useState();
    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        fetchTeamMember();
       
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

console.log ( user.firstName)

    return (
        <form>
        <label> Team Member </label> 

      <select onSelect={(e) => setTeamMember(e.target.value)}><option> Please Pick as TeamMember</option>
        {shifts &&
          shifts.map((shift) => (
            
            <option key={shift.id} value={teamMember} >


               {shift.teamMemberFirstName}
            
                
             
            </option> 
          ))} </select> 
          
    
      </form>
      );
}
 
export default TeamMemberSelect;