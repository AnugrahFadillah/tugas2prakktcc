import Notes from "../model/NotesModel.js";

// Get All Notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.findAll();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Note By ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Notes.findOne({ where: { id: req.params.id } });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Note
export const createNote = async (req, res) => {
    try {
        await Notes.create(req.body);
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Note
export const updateNote = async (req, res) => {
    try {
        const note = await Notes.findOne({ where: { id: req.params.id } });
        if (!note) return res.status(404).json({ message: "Note not found" });
        await Notes.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Note
export const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findOne({ where: { id: req.params.id } });
        if (!note) return res.status(404).json({ message: "Note not found" });
        await Notes.destroy({ where: { id: req.params.id } });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
