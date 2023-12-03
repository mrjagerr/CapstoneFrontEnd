import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDrop = (value) => {
  const [user, token] = useAuth();
  const [teamMember, setTeamMember] = useState([]);
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
      //   console.log(error.response.data);
    }
  };
 const handleDragDrop =(results) => {
  console.log("hello there" , results);
 let value = teamMember;
setTeamMember(results.draggableId)


}
  return (
    <div>
      <DragDropContext
        onDragEnd={handleDragDrop}
      >
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {shifts &&
                shifts.map((shift,index) => (
                  <Draggable draggableId={shift.teamMemberFirstName} key={shift.id} index = {index}>
                    {(provided) => (
                      <div>
                        <div key={shift.id} value={teamMember}>
                          <div {...provided.dragHandleProps}{...provided.draggableProps} ref = {provided.innerRef}>{shift.teamMemberFirstName}</div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))} {console.log(teamMember)}
                 {provided.placeholder}
            </div>
          
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default DragAndDrop;
