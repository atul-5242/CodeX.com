import { Router } from "express";
import { getAllMessagesByID, sendMessage } from "../controller/chatController";

const ChatRoute = Router();

// Route for sending a new message (direct or group)
ChatRoute.post("/sendMessage",(req,res,next)=>{
    try {
        sendMessage(req, res);
    } catch (error) {
        next(error);
    }
});

ChatRoute.post("/getChatById", (req,res)=>{  
        getAllMessagesByID(req, res);
}); 

export default ChatRoute;
