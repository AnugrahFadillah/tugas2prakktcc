import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { BASE_URL } from "../utils";

const NotesApp = ({ handleLogout }) => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`${BASE_URL}/notes`);
    setNotes(response.data);
  };

  const addOrUpdateNote = async () => {
    if (!name || !title || !content) return alert("All fields required!");
    if (editMode) {
      await axios.put(`${BASE_URL}/notes/${editId}`, { name, title, content });
    } else {
      await axios.post(`${BASE_URL}/notes`, { name, title, content });
    }
    resetForm();
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${BASE_URL}/notes/${id}`);
    fetchNotes();
  };

  const editNote = (note) => {
    setName(note.name);
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setEditId(note.id);
  };

  const resetForm = () => {
    setName("");
    setTitle("");
    setContent("");
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="container p-5">
      {/* Header dan Tombol Logout */}
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
        <h1 className="title has-text-info">Notes App</h1>
        <button onClick={handleLogout} className="button is-danger">
          Logout
        </button>
      </div>

      <NoteForm
        name={name}
        title={title}
        content={content}
        setName={setName}
        setTitle={setTitle}
        setContent={setContent}
        editMode={editMode}
        addOrUpdateNote={addOrUpdateNote}
        cancelUpdate={resetForm}
      />

      <NoteList
        notes={notes}
        search={search}
        setSearch={setSearch}
        onEdit={editNote}
        onDelete={deleteNote}
      />
    </div>
  );
};

export default NotesApp;
