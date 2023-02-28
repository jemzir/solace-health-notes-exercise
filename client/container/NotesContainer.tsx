import React, { ChangeEventHandler, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

function NotesContainer() {
  // requesting from the backend, to grab and create Note components
  // based on the array 
  // if there are existing characters in the searchBar, it will filter the array based on that
  // need a useEffect here... can also make searchBar be the one that passes the state of arrays down to notesContainer

  const [ notesData, setNotesData ] = useState([""]);
  const [ visibleNotes, setVisibleNotes ] = useState([""]);

  const contentData:string[] = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/api");
      const data = await response.json();
      for (let i = 0; i < data.notes.length; i++) {
        contentData.push(data.notes[i].content)
      }
      setNotesData(contentData);
      setVisibleNotes(contentData);
    }
    fetchData();
  },
  []);

  function filterNotes(e: React.ChangeEvent<HTMLInputElement>) {
    const textMatch = e.target.value;
    const filteredNotes:string[] = notesData.filter((el) => el.includes(textMatch));
    setVisibleNotes(filteredNotes);
  }
  
  return (
    <div>
      <input onChange={filterNotes} placeholder="Search Bar" className="search-bar">
      </input>
      <div className="notes-container">
        {visibleNotes.map((el, i) => <div key={i} >{el}</div>)}
      </div>
    </div>
  )
}

export default NotesContainer;