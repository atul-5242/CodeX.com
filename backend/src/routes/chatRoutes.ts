import { Router } from "express";
import { ChatController } from "../controller/chatController";
import { userMiddleware } from "../middleware/auth";

const ChatRoute = Router();

// Route for sending a new message (direct or group)
ChatRoute.post("/send-message", userMiddleware,(req,res,next)=>{
    ChatController.sendMessage(req,res).catch(next);
});

export default ChatRoute;
