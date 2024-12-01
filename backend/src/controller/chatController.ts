import { Request, Response } from "express";
import { Message } from "../models/messageModel";
import  {PersonalChat}  from "../models/PersonalModel";
import { Group } from "../models/GroupsModel";
import { User } from "../models/User";

export class ChatController {

    // Send a message (either direct or group message)
    static sendMessage = async (req: Request, res: Response): Promise<Response> => {
        const { from, to, message, type, groupId } = req.body;

        try {
            // Check if type is direct or group
            if (type === "direct") {
                // Personal chat handling
                if (!to) {
                    return res.status(400).json({ success: false, message: "Recipient 'to' is required for direct messages." });
                }

                // Find or create a personal chat between users
                let personalChat = await PersonalChat.findOne({
                    participants: { $all: [from, to] }
                });

                if (!personalChat) {
                    // Create a new personal chat if not found
                    personalChat = new PersonalChat({
                        participants: [{ userId: from }, { userId: to }],
                        messages: [],
                    });
                    await personalChat.save();

                    // Add this chat to both users' `p2pChatIds`
                    await User.findByIdAndUpdate(from, { $push: { p2pChatIds: personalChat._id } });
                    await User.findByIdAndUpdate(to, { $push: { p2pChatIds: personalChat._id } });
                }

                // Create a new message for the personal chat
                const newMessage = new Message({
                    from,
                    to,
                    message,
                    type: "direct",
                });

                await newMessage.save();

                // Update the personal chat with the new message
                personalChat.messages.push({
                    sender: { userId: from, messageIds: [newMessage._id] },
                    receiver: { userId: to, messageIds: [newMessage._id] },
                });

                await personalChat.save();

                return res.status(200).json({ success: true, message: "Direct message sent successfully!" });

            } else if (type === "group") {
                // Group chat handling
                if (!groupId) {
                    return res.status(400).json({ success: false, message: "'groupId' is required for group messages." });
                }

                // Find the group
                const group = await Group.findById(groupId);

                if (!group) {
                    return res.status(404).json({ success: false, message: "Group not found." });
                }

                // Create a new message for the group
                const newMessage = new Message({
                    from,
                    groupId,
                    message,
                    type: "group",
                });

                await newMessage.save();

                // Update the group's messages array with the new message
                group.messages.push({
                    senders: [{ userId: from, messageIds: [newMessage._id] }],
                    receiver: { userId: from, messageIds: [newMessage._id] },
                });

                await group.save();

                return res.status(200).json({ success: true, message: "Group message sent successfully!" });

            } else {
                return res.status(400).json({ success: false, message: "Invalid message type. Must be 'direct' or 'group'." });
            }

        } catch (error) {
            console.error("Error sending message:", error);
            return res.status(500).json({ success: false, message: "Failed to send message."});
        }
    };
}
