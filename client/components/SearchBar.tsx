import React ,{ useState } from "react";

function SearchBar() {
  // having a filter functionality based on the input of what is inside the text area
  // make use of useEffect on change to give this functionality
  const [ filter, setFilter ] = useState("");
  function onChange() {
    
  }
  
  return (
    <textarea placeholder="making use of a textArea here." className="search-bar">
    </textarea>
  )
}

export default SearchBar;