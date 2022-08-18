import React from "react";

const ButtonAction = (props) => {
  return (
    <div className="note-item__action">
      <button className="note-item__delete-button" onClick={() => props.onDelete(props.id)}>Delete</button>
      <button className="note-item__archive-button" onClick={() => props.onArchive(props.id)}>
        {props.isArchived ? "Pindahkan" : "Arsipkan"}
      </button>
    </div>
  )
}

export default ButtonAction;