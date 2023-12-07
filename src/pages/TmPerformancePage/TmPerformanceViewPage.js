import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Chart } from "react-google-charts";








const TmPerformanceViewPage = () => {

const [myshifts, setMyShifts] = useState();
const [user, token] = useAuth();
const [priorityFill,setPriorityFill] = useState()


useEffect(() => {
    fetchMyShifts();

   
  }, [token]);

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
          console.log(myshifts)
        } catch (error) {
          console.log(error.response.data);
        }
      };
   
    

      
      

    return (
    <div>
         <h1>Performance Page for {user.userName}!</h1>
         <div>
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
   <div>
   {myshifts &&
          myshifts.map((myShifts)=>{

          })}
   </div>
  

 
    </div>);
}
 
export default TmPerformanceViewPage;