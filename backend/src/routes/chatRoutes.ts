import { Router } from "express";
import { getAllMessagesByID, sendMessage } from "../controller/chatController";
// import { userMiddleware } from "../middleware/auth";
import { addMembers, createGroup } from "../controller/GroupController/GroupControl";

const ChatRoute = Router();

// Route for sending a new message (direct or group)
ChatRoute.post("/sendMessage",(req,res,next)=>{
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
ChatRoute.get("/getChatById/:id", (req,res)=>{  
        console.log("Hii there....................................................");
        getAllMessagesByID(req, res);
}); 

export default ChatRoute;
