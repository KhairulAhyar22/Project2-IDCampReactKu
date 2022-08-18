import React from "react";
import NoteItem from "./notesItem";

const NoteList = (props) => {
  return (
    props.notes.length > 0 ?
    <div className="notes-list">
      {
        props.notes.map((note) => (
          <NoteItem key={note.id}
          id={note.id}
          onDelete={props.onDelete}
          onArchive={props.onArchive}
          isArchived={note.archived}
          {...note}/>
        ))
      }
    </div> :
    <p className="notes-list__empty-message">Tidak Ada Catatan</p>
  )
}

export default NoteList;