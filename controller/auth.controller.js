import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authController = {
    async signup(req, res){
        const {user} = req.body;
        const userWithEmail = await db.collection("user").findOne({email: user.email});
        if(userWithEmail){
            return res.sendStatus(409);
        }

        const hashedPassword = bcrypt.hashSync(user.password, 10);
        await db.collection("user").insertOne({email: user.email, password: hashedPassword, name: user.name});
        return res.sendStatus(201);
    },

    async signin(req, res){
        const { user } = req.body;
        const userWithEmail = await db.collection("user").findOne({email: user.email});
        if(!userWithEmail){
            return res.sendStatus(401);
        }

        const validPassword = bcrypt.compareSync(user.password, userWithEmail.password);
        if(!validPassword){
            return res.sendStatus(401)
        }
        
        const token = jwt.sign({id: userWithEmail._id}, process.env.SECRET_KEY, {expiresIn: '3h'});
        return res.send({
            token   
        })
    }
}