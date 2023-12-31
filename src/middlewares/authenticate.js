import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authenticate(req, res, next){
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(401);
    }
    const authParts = authorization.split(" ");
    if(authParts[0] !== "Bearer"){
        return res.sendStatus(401);
    }
    if(authParts.length !== 2){
        return res.sendStatus(401);
    }
    let existError = false;
    const token = authParts[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            existError =true
        }
        req.userId = decoded?.id
    });
    if(existError){
        return res.sendStatus(401);
    }
    next();
}