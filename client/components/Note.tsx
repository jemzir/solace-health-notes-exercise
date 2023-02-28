import React from "react";

interface NoteProps {
  prop: string,
  index: number
}

function Note({ prop }: NoteProps) {

  return (
    <div>
      {prop}
    </div>
  )
}

export default Note;