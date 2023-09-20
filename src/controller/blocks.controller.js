import { ObjectId } from "bson";
import { db } from "../config/database.js";

export const blocksController = {
    async getBlocks(req, res){
        const {userId} = req;
        const blocks = await db.collection("blocks").find({userId}).toArray();
        res.send({blocks});
    },

    async createBlock(req, res){
        const { block } = req.body;
        const { userId } = req;
        await db.collection("blocks").insertOne({block, userId});
        return res.sendStatus(201); 
    },

    async getOne(req, res){
        const { id } = req.params;
        const { userId } = req;
        const block = await db.collection("blocks").findOne({_id: new ObjectId(id)})
        if(!block){
            return res.sendStatus(409);
        }
        if(list.userId !== userId){
            return res.sendStatus(409)
        }
        return res.send(block)
    },

    async updateBlock(req, res){
        const { id } = req.params;
        const { block } = req.body;
        const { userId } = req;

        const blockWithId = await db.collection("blocks").findOne({_id: new ObjectId(id)});
        if(!blockWithId){
            return res.sendStatus(409);
        }
        if(listWithId.userId !== userId){
            return res.sendStatus(409);
        }
        await db.collection("blocks").updateOne({_id: new ObjectId(id)}, {$set: {block: block}});
        return res.sendStatus(200);
    },

    async remove(req, res){
        const { id } = req.params;
        const { userId } = req;

        const blockWithId = await db.collection("blocks").findOne({_id: new ObjectId(id)});
        if(!blockWithId){
            return res.sendStatus(204);
        }
        if(blockWithId.userId !== userId){
            return res.sendStatus(409);
        }
        await db.collection("blocks").deleteOne({_id: new ObjectId(id)});
        return res.sendStatus(204);
    },
}
