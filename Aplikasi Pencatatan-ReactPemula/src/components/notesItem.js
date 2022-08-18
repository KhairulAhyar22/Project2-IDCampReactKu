import React from "react";
import NoteBody from "./notesBody";
import ButtonAction from "./buttonAction";

const NoteItem = (props) => {
  return (
    <div className="note-item">
      <NoteBody title={props.title} createdAt={props.createdAt} body={props.body}/>
      <ButtonAction id={props.id} onDelete={props.onDelete} onArchive={props.onArchive} isArchived={props.isArchived}/>
    </div>
  )
}

export default NoteItem;