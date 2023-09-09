import { db } from "../config/database.js";
import { ObjectId } from "bson";

export const notesController = {
    async getNotes(req, res){
        const notes = await db.collection("notes").find({}).toArray();
        return res.send({ notes });
    },

    async createNotes(req, res){
        const {note} = req.body;
        await db.collection("notes").insertOne({note: note});
        return res.sendStatus(201);
    },

    async getOne(req, res){
        const {id} = req.params;
        const note = await db.collection("notes").findOne({_id: new ObjectId(id)});
        return res.send(note);
    },

    async updateNote(req, res){
        const { id } = req.params;
        const {note} = req.body;
        const updatedNote = await db.collection("notes").updateOne({_id: new ObjectId(id)}, {$set: {note: note}});
        return res.send(updatedNote);
    },

    async deleteNote(req, res){
        const {id} = req.params;
        await db.collection("notes").deleteOne({_id: new ObjectId(id)});
        return res.sendStatus(204);
    }
}