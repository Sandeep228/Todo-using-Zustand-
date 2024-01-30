import './App.css';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import React, { useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import useCourseStore from './app/courseStore';



function App() {

  const {courses} = useCourseStore(
    (state) => ({
        courses: state.courses,
    })
)

const [complete,setComplete]  =useState([]);
const [pending,setPending]  =useState([]);

  const onDragEnd  =(result) => {
    console.log(result)
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = courses;
    let pending1 = pending;
    let complete1 = complete;
   
     // Source Logic
    if (source.droppableId === "Active") {
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else if(source.droppableId === "Completed") {
     add = complete1[source.index];
     complete1.splice(source.index,1);
    } else {
      add = pending1[source.index];
      pending1.splice(source.index, 1);
    }
    // Destination Logic
    if (destination.droppableId === "Active") {
      active.splice(destination.index, 0, add);
    }else if(destination.droppableId === "Completed"){
      pending1.splice(destination.index, 0, add);
    } else {
      complete1.splice(destination.index, 0, add);
    }

  
    
    
    setComplete(complete);
     setPending(pending1); 
  }

  console.log(pending)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="main-container">
      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "2rem"
      }}> My Course list</h1>
      <CourseForm/>
      <CourseList pending={pending}/>
    </div>
    </DragDropContext>
  );
}

export default App;