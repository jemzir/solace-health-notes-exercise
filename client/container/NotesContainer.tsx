import React, { useEffect, useState } from "react";
import CreateNewNoteBtn from "../components/CreateNewNoteBtn";
import Note from "../components/Note";

function NotesContainer() {
  // requesting from the backend, to grab and create Note components
  // based on the array 
  // if there are existing characters in the searchBar, it will filter the array based on that

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

  useEffect(() => {
    setVisibleNotes(visibleNotes);
  }, [visibleNotes])

  // filtering functionality for indexing
  function filterNotes(e: React.ChangeEvent<HTMLInputElement>) {
    const textMatch = e.target.value;
    const filteredNotes:string[] = notesData.filter((el) => {
      el = el.toLowerCase();
      return el.includes(textMatch.toLowerCase());
    });
    setVisibleNotes(filteredNotes);
  }

  // a refreshing function that will be prop drilled down --
  /** in a small application, one can get away with prop passing once/twice, but on a larger scale
   * needing to make use of a sing source of truth is better , like Redux
   */
  function refreshNotes(arr:string[]) {
    setVisibleNotes(arr);
  }
  
  return (
    <>
      <input onChange={filterNotes} placeholder="Search Bar" className="search-bar">
      </input>
      <div className="notes-container">
        {visibleNotes.map((el, i) => <Note key={i} prop={el} index={i} refreshFunc={refreshNotes}></Note>)}
      </div>
      < CreateNewNoteBtn notesProp={visibleNotes} refreshFunc={refreshNotes} />
    </>
  )
}

export default NotesContainer;