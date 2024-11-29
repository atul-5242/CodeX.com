import { Request, Response } from "express";
import { Message } from "../models/messageModel"; // Import your message model (or any model you use)
import WebSocket from "ws";
// User interface to store socket information
export interface User {
    socket: WebSocket;
    userId?: string;
    userSno?: number;
}

// Controller for handling direct and group chat
export class ChatController {

    // Create a new message (could be direct or group chat)
    static sendMessage =  async (req: Request, res: Response):Promise<Response>=> {
        const { from, to, message, type, groupId } = req.body;

        // Create a new message in DB
        const newMessage = new Message({
            from,
            to,
            message,
            type, // 'direct' or 'group'
            groupId,
        });

        await newMessage.save();

        return res.status(200).json({ success: true, message: "Message sent successfully!" });
    }
}
