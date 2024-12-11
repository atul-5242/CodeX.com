import { Router } from "express";
import { sendMessage } from "../controller/chatController";
import { userMiddleware } from "../middleware/auth";
import { addMembers, createGroup } from "../controller/GroupController.ts/GroupControl";

const ChatRoute = Router();

// Route for sending a new message (direct or group)
ChatRoute.post("/sendMessage", (req,res,next)=>{
    try {
        sendMessage(req, res);
    } catch (error) {
        next(error);
    }
});
ChatRoute.post("/createGroup", (req,res,next)=>{
    try {
        console.log("Hii there....................................................");
        createGroup(req, res);
    } catch (error) {
        next(error);
    }
});
ChatRoute.post("/addMembers_", (req,res,next)=>{
    try {
        console.log("Hii there....................................................");
        addMembers(req, res);
    } catch (error) {
        next(error);
    }
});

export default ChatRoute;
