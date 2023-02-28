import React from "react";

function Note(prop:string) {
  // to be created and added into the notes container, will make use of 
  // an array pulled from backend to fill up each note...
  // will also have a "hide" property that will initiallly be set to false
    // that hide property will be used in search bar??
  return (
    <div>
      {prop}
    </div>
  )
}

export default Note;