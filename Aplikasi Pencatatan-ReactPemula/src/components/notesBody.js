import React from "react";
import { showFormattedDate } from "../utils/data";

const NoteBody = (props) => {
  return (
    <div className="note-item__content">
      <h3 className="note-item__title">{props.title}</h3>
      <p className="note-item__date">{showFormattedDate(props.createdAt)}</p>
      <p className="note-item__body">{props.body}</p>
    </div> 
  )
}

export default NoteBody;