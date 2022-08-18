import React from "react";

const NoteHeader = (props) => {
  return (
    <div className="note-app__header">
      <h1>Notes</h1>
      <div className="note-search">
        <input type="text" placeholder="Cari catatan.." onChange={(event) => props.onSearch(event.target)} value={props.titleSearch}/>
      </div>
    </div>
  )
}

export default NoteHeader;