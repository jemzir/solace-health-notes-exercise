import React, { useState } from "react";

interface CreateNewNoteProps {
  notesProp: string[],
  refreshFunc(arr: string[]): void
}

function CreateNewNoteBtn({ refreshFunc }: CreateNewNoteProps) {
  // request with contents upon submission (make sure it is x>20 && x<200) on submit
  const [ newNote, setNewNote] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newNote.length < 20) {
      alert("Note less than needed 20 characters");
      return;
    }
    if (newNote.length > 300) {
      alert("Note greater than allowed 300 characters");
      return;
    }
    console.log(newNote);

    const fetchedData = await fetch("http://localhost:5001/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content: newNote})
    });
    const parsedNotes = await fetchedData.json();

    refreshFunc(parsedNotes);
    alert("Note Added!");
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newNote">New Note</label>
      <input id="noteContents" type="text" onChange={(e) => setNewNote(e.target.value)}></input>
      <button type="submit" className="create-new">Create</button>
    </form>
  )
}

export default CreateNewNoteBtn;