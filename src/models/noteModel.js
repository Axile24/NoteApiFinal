const Datastore = require('nedb');
const path = require('path');

class NoteModel {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, '../../data/notes.db'),
            autoload: true
        });
    }

    // Create a new note
    async create(note) {
        return new Promise((resolve, reject) => {
            this.db.insert(note, (err, newNote) => {
                if (err) reject(err);
                else resolve(newNote);
            });
        });
    }

    // Get all notes
    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, notes) => {
                if (err) reject(err);
                else resolve(notes);
            });
        });
    }

    // Get note by ID
    async getById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, note) => {
                if (err) reject(err);
                else resolve(note);
            });
        });
    }

    // Update note
    async update(id, updates) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, { $set: updates }, {}, (err, numUpdated) => {
                if (err) reject(err);
                else resolve(numUpdated);
            });
        });
    }

    // Delete note
    async delete(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    }
}

module.exports = new NoteModel(); 