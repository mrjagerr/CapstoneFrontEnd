import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DragAnddDropTmShiftCard.css";

const DragAndDropTmShiftCard = () => {
  const [user, token] = useAuth();

 
 const [tasks,setTasks] = useState([])

  useEffect(() => {
    fetchTeamMember();
  }, [token]);
  
  const fetchTeamMember = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/Tasks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
   
    
      setTasks(response.data)
    } catch (error) {
      //   console.log(error.response.data);
    }
  };
  const handleDragDrop = (results) => {
    console.log("hello there", results);
    const { source, destination, type } = results;

   
    
  };

  return (
    <div>
      <div></div>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks &&
                tasks.map((tasks, index) => (
                  <Draggable
                    draggableId={tasks.goalAssignedTo}
                    key={tasks.id}
                    index={index}
                  >
                    {(provided) => (
                      <div>
                        <div key={tasks.id} value={tasks}>
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {" "}
                            <p> {tasks.goal} {tasks.goalAssignedTo} </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}{" "}
              {console.log(tasks)} {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default DragAndDropTmShiftCard;
