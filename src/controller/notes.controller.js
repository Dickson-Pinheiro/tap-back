import { db } from "../config/database.js";
import { ObjectId } from "bson";

export const notesController = {
    async getNotes(req, res){
        const {userId} = req;
        const notes = await db.collection("notes").find({userId}).toArray();
        return res.send({ notes });
    },

    async createNotes(req, res){
        const {note} = req.body;
        const {userId} = req;
        await db.collection("notes").insertOne({note: note, userId});
        return res.sendStatus(201);
    },

    async getOne(req, res){
        const {id} = req.params;
        const {userId} = req;
        const note = await db.collection("notes").findOne({_id: new ObjectId(id)});
        if(!note){
            return res.sendStatus(409);   
        }
        if(note.userId !== userId){
            return res.sendStatus(403);
        }
        return res.send(note);
    },

    async updateNote(req, res){
        const { id } = req.params;
        const { note } = req.body;
        const { userId } = req;
        const noteWidhId = await db.collection("notes").findOne({_id: new ObjectId(id)});
        if(!noteWidhId){
            return res.sendStatus(409);   
        }
        if(noteWidhId.userId !== userId){
            return res.sendStatus(403);
        }
        const updatedNote = await db.collection("notes").updateOne({_id: new ObjectId(id)}, {$set: {note: note}});
        return res.send(updatedNote);
    },

    async deleteNote(req, res){
        const {id} = req.params;
        const { userId } = req;
        const noteWidhId = await db.collection("notes").findOne({_id: new ObjectId(id)});
        if(!noteWidhId){
            return res.sendStatus(204);   
        }
        if(noteWidhId.userId !== userId){
            return res.sendStatus(403);
        }
        await db.collection("notes").deleteOne({_id: new ObjectId(id)});
        return res.sendStatus(204);
    }
}