import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({
  notes = [], // ✅ Nilai default array kosong jika undefined
  search,
  setSearch,
  onEdit,
  onDelete,
}) => (
  <div>
    {/* Search Input */}
    <input
      className="input mb-3"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Daftar Note */}
    {notes.length > 0 ? (
      notes
        .filter(
          (note) =>
            note.name.toLowerCase().includes(search.toLowerCase()) ||
            note.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
    ) : (
      <p className="has-text-centered">No notes available.</p> // Pesan jika tidak ada note
    )}
  </div>
);

export default NoteList;
