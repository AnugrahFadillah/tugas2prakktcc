import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, search, setSearch, onEdit, onDelete, handleLogout }) => (
  <div>
    {/* Tombol Logout */}
    <div className="has-text-right mb-4">
      <button className="button is-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>

    {/* Search Input */}
    <input
      className="input mb-3"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Daftar Note */}
    {notes
      .filter(note =>
        note.name.toLowerCase().includes(search.toLowerCase()) ||
        note.title.toLowerCase().includes(search.toLowerCase())
      )
      .map(note => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
  </div>
);

export default NoteList;

