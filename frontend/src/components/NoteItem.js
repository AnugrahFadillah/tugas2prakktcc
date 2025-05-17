import React from "react";

const NoteItem = ({ note, onEdit, onDelete }) => (
  <div className="box" style={{ backgroundColor: "#f0f8ff" }}>
    <h2 className="subtitle has-text-weight-bold">{note.name}</h2>
    <h3 className="subtitle has-text-weight-bold has-text-info">{note.title}</h3>
    <p>{note.content}</p>
    <button className="button is-warning mr-2" onClick={() => onEdit(note)}>Edit</button>
    <button className="button is-danger" onClick={() => onDelete(note.id)}>Delete</button>
  </div>
);

export default NoteItem;
