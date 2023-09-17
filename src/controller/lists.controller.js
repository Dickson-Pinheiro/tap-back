import { ObjectId } from "bson";
import { db } from "../config/database.js";

export const listsController = {
    async getLists(req, res){
        const {userId} = req;
        const lists = await db.collection("lists").find({userId}).toArray();
        res.send({lists});
    },

    async createList(req, res){
        const { list } = req.body;
        const { userId } = req;
        await db.collection("lists").insertOne({list, userId});
        return res.sendStatus(201); 
    },

    async getOne(req, res){
        const { id } = req.params;
        const { userId } = req;
        const list = await db.collection("lists").findOne({_id: new ObjectId(id)})
        if(!list){
            return res.sendStatus(409);
        }
        if(list.userId !== userId){
            return res.sendStatus(409)
        }
        return res.send(list)
    },

    async updateList(req, res){
        const { id } = req.params;
        const { list } = req.body;
        const { userId } = req;

        const listWithId = await db.collection("lists").findOne({_id: new ObjectId(id)});
        if(!listWithId){
            return res.sendStatus(409);
        }
        if(listWithId.userId !== userId){
            return res.sendStatus(409);
        }
        await db.collection("lists").updateOne({_id: new ObjectId(id)}, {$set: {list: list}});
        return res.sendStatus(200);
    },

    async remove(req, res){
        const { id } = req.params;
        const { userId } = req;

        const listWithId = await db.collection("lists").findOne({_id: new ObjectId(id)});
        if(!listWithId){
            return res.sendStatus(204);
        }
        if(listWithId.userId !== userId){
            return res.sendStatus(409);
        }
        await db.collection("lists").deleteOne({_id: new ObjectId(id)});
        return res.sendStatus(204);
    },
}
