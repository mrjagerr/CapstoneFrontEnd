import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AdminEditPage = () => {
  const [user, token] = useAuth();

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

  console.log(shifts);

  return (
    <div>
      <form>
        <label> Team Member </label> <select >

      
        {shifts &&
          shifts.map((shift) => (
            <div key={shift.id}>
           
                <option value="TeamMember">{shift.teamMemberFirstName}</option>
            
                
             
            </div> 
          ))}  </select>
        <label> Area To Zone</label>

        <select>
          <option value="fruit">Fruit</option>

    
        </select>

        <label> Priority Area</label>
        <select>
          <option value="fruit">Fruit</option>

       
        </select>
      </form>

      <form>
        <label>Priority Fill</label>
        <input></input>
      </form>
      <form>
        <label>Out Of Stocks</label>
        <input></input>
      </form>
      <form>
        <label>Zone </label>
        <input></input>
      </form>
    </div>
  );
};

export default AdminEditPage;
