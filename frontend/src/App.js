import React, { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { BASE_URL } from "./utils";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("view");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addOrUpdateNote = async () => {
    if (!name || !title || !content) {
      setError("All fields must be filled!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/notes/${editId}`, { name, title, content });
        setMessage("Note updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/notes`, { name, title, content });
        setMessage("Note added successfully!");
      }
      setName("");
      setTitle("");
      setContent("");
      setEditMode(false);
      setEditId(null);
      setTimeout(() => {
        setMessage("");
        fetchNotes();
      }, 3000);
      setActiveMenu("view");
    } catch (error) {
      console.error("Error adding/updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (note) => {
    setName(note.name);
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setEditId(note.id);
    setActiveMenu("add");
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #87CEEB, #ffffff)", minHeight: "100vh", padding: "20px" }}>
      <div className="container p-5" style={{ maxWidth: "600px", margin: "auto", borderRadius: "10px", padding: "20px", background: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h1 className="title has-text-centered has-text-info">Sky Notes</h1>
        {message && <div className="notification is-success has-text-centered">{message}</div>}
        {error && <div className="notification is-danger has-text-centered">{error}</div>}
        <div className="buttons is-centered">
          <button className="button" style={{ backgroundColor: "#4682B4", color: "white" }} onClick={() => setActiveMenu("add")}>
            {editMode ? "Edit Note" : "Add Note"}
          </button>
          <button className="button" style={{ backgroundColor: "#5F9EA0", color: "white" }} onClick={() => setActiveMenu("view")}>
            View Notes
          </button>
        </div>
        {activeMenu === "add" && (
          <div className="box" style={{ borderRadius: "8px", backgroundColor: "white" }}>
            <div className="field">
              <label className="label" style={{ color: "#333", fontWeight: "bold" }}>Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  style={{ borderColor: "#4682B4", backgroundColor: "#f0f8ff", color: "#000" }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: "#333", fontWeight: "bold" }}>Title</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  style={{ borderColor: "#4682B4", backgroundColor: "#f0f8ff", color: "#000" }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: "#333", fontWeight: "bold" }}>Content</label>
              <div className="control">
                <textarea
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea"
                  style={{ borderColor: "#4682B4", backgroundColor: "#f0f8ff", color: "#000" }}
                ></textarea>
              </div>
            </div>

            {/* Tombol Add/Update Note */}
            <button onClick={addOrUpdateNote} className="button" style={{ backgroundColor: "#4682B4", color: "white", width: "100%", marginBottom: "10px" }}>
              {editMode ? "Update Note" : "Add Note"}
            </button>

            {/* Tombol Cancel Update */}
            {editMode && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setEditId(null);
                  setName("");
                  setTitle("");
                  setContent("");
                }}
                className="button"
                style={{ backgroundColor: "#B0C4DE", color: "white", width: "100%" }}
              >
                Cancel Update
              </button>
            )}
          </div>
        )}
        {activeMenu === "view" && (
          <div>
            <label className="label" style={{ color: "#333", fontWeight: "bold" }}>Search</label>
            <input className="input" type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: "10px", borderColor: "#4682B4", backgroundColor: "#f0f8ff", color: "#000" }} />
            {notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.name.toLowerCase().includes(search.toLowerCase())).map(note => (
              <div key={note.id} className="box" style={{ borderRadius: "8px", marginBottom: "10px", backgroundColor: "#f0f8ff" }}>
                <h2 className="subtitle has-text-weight-bold" style={{ color: "#2b4f6f" }}>{note.name}</h2>
                <h3 className="subtitle" style={{ color: "#4169E1", fontWeight: "bold" }}>{note.title}</h3>
                <p style={{ color: "#000" }}>{note.content}</p>
                <button onClick={() => editNote(note)} className="button" style={{ backgroundColor: "#FFA500", color: "white", marginRight: "10px" }}>
                  Edit
                </button>
                <button onClick={() => deleteNote(note.id)} className="button" style={{ backgroundColor: "#DC143C", color: "white" }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
