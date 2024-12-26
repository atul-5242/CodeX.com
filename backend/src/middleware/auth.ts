import { NextFunction,Request,Response } from "express"
import jwt from "jsonwebtoken";
type headerType = string | undefined;


export const userMiddleware =(req:Request,res:Response,next:NextFunction):void =>{

    const header:headerType|undefined=req.headers.authorization;
    const JWT_SECRET:string |undefined="ChatAppAtul";
    // const token = jwt.verify(header,JWT_SECRET);

    // Cheking here header is present or not:
    if(!header || !header.startsWith("Bearer ")) {
        console.log("The header is here1:",header);
        res.status(401).json({message:"Authorization token is missing or invalid"});
        return;
    }

    const token = header.split(" ")[1];
    try {
        if(!JWT_SECRET){
            res.json({message:"JWT_SECRET is missing"});    
            return;
        }

        const decode=jwt.verify(token,JWT_SECRET);
        (req as any).user=decode;

        res.json({
            message:"Token IS Verified.",
            token:token,
        })
        next();
    } catch (e) {
        res.status(401).json({
            message:"Error while verifying token through Jwt",
        })
        return ;
    }
}