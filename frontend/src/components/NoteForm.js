import React from "react";

const NoteForm = ({
  name,
  title,
  content,
  setName,
  setTitle,
  setContent,
  editMode,
  addOrUpdateNote,
  cancelUpdate,
}) => {
  return (
    <div className="box" style={{ borderRadius: "8px", backgroundColor: "white" }}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Content</label>
        <div className="control">
          <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
      </div>
      <button onClick={addOrUpdateNote} className="button is-info is-fullwidth">
        {editMode ? "Update Note" : "Add Note"}
      </button>
      {editMode && (
        <button onClick={cancelUpdate} className="button is-warning is-fullwidth mt-2">
          Cancel Update
        </button>
      )}
    </div>
  );
};

export default NoteForm;
