import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TeamMemberTaskList.css";
import PostToList from "../PostToList/PostToList";



const TeamMemberTaskList = () => {
  const [user, token] = useAuth();
const [completedTask,setCompletedTasks] = useState();
 const [tasks,setTasks] = useState();
 

  useEffect(() => {
   fetchTasks();
  }, [token]);
 
  const fetchTasks = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/Tasks", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
   
    
      setTasks(response.data)
      setCompletedTasks(tasks)
     
    } catch (error) {
      //   console.log(error.response.data);
    }
  };
  async function completeTask(id){
try {
      await axios.delete(`https://localhost:5001/api/Tasks/${id}`)
       
   fetchTasks();
    
    
    } catch (error) {
      //   console.log(error.response.data);
    }
  }
  
  const handleDragDrop = (results) => {
    console.log("hello there", results);
 
    
  const {source,destination,type} =results;
  if (!destination) return;
  if (source.droppableId === destination.droppableId && source.index === destination.index)
  return;
if(type === 'group'){
  const reorderedTasks = [...tasks];
 console.log(reorderedTasks)
 const sourceIndex = source.index;
 const destinationIndex = destination.index
 const [removeTasks] = reorderedTasks.splice(sourceIndex,1);
 reorderedTasks.splice(destinationIndex,0, removeTasks)
 return setTasks(reorderedTasks)
 

}
    
  };

  return (
    <div className="List">
      <div className="progress"></div>
      <PostToList onSubmit ={ fetchTasks}/>
      <button onClick={fetchTasks} >  Get Current Tasks </button>
      <div className="postBox">
      <div className="Container">
      <div className="cardTitle" >
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="Tasks" type="group">
          {(provided) => (
            <div  {...provided.droppableProps} ref={provided.innerRef}>
              {tasks&&
                tasks.map((tasks, index) => (
                  <Draggable
                    draggableId={tasks.goalAssignedTo}
                    key={tasks.id}
                    index={index}
                  >
                    {(provided) => (
                      <div >
                        <div key={tasks.id} value={tasks}>
                          <div className="editCard"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {" "}
                            <p> {tasks.goal} {tasks.goalAssignedTo} {tasks.id} </p>
                            <button onClick ={()=>completeTask(tasks.id)}> Complete </button>
                            
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}{" "}
               {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      </div>
     <div className="Container">
      
      
      </div>
      </div>
     
    </div>
  );
};
export default TeamMemberTaskList;
