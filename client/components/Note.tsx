import React from "react";

interface NoteProps {
  prop: string,
  index: number,
  refreshFunc(arr: string[]): void
}

function Note({ prop, refreshFunc }: NoteProps) {

  // delete functionality to be inbued in with the note
  // same idea from createNote, where there is a mutated fetch to repopulate notes
  const handleClick = async () => {
    const mutatedFetch = await fetch("http://localhost:5001/api", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content: prop})
    })
    const remainingNotes = await mutatedFetch.json();
    console.log('usable array result: ', remainingNotes);
    console.log('content: ', prop);
    
    refreshFunc(remainingNotes);    
  }
  
  return (
    <>
      <div className="note">
        <span>{prop}</span><button onClick={handleClick} className="delete-note">x</button>
      </div>
    </>
  )
}

export default Note;