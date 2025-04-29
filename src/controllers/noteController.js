const noteModel = require('../models/noteModel');

class NoteController {
    // Create a new note
    async createNote(req, res) {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({ error: 'Title and content are required' });
            }
            const note = await noteModel.create({ title, content, createdAt: new Date() });
            res.status(201).json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all notes
    async getAllNotes(req, res) {
        try {
            const notes = await noteModel.getAll();
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get note by ID
    async getNoteById(req, res) {
        try {
            const note = await noteModel.getById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update note
    async updateNote(req, res) {
        try {
            const { title, content } = req.body;
            if (!title && !content) {
                return res.status(400).json({ error: 'At least one field (title or content) is required' });
            }
            const updates = {};
            if (title) updates.title = title;
            if (content) updates.content = content;
            updates.updatedAt = new Date();

            const numUpdated = await noteModel.update(req.params.id, updates);
            if (numUpdated === 0) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json({ message: 'Note updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete note
    async deleteNote(req, res) {
        try {
            const numRemoved = await noteModel.delete(req.params.id);
            if (numRemoved === 0) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json({ message: 'Note deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NoteController(); 