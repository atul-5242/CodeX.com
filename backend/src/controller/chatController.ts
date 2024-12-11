import { Request, Response } from "express";
import { Message } from "../models/messageModel";
import { Group } from "../models/GroupsModel";
import { User } from "../models/User";
import mongoose from "mongoose";

export const sendMessage = async (req: Request, res: Response): Promise<Response> => {
    const { from, to, message, type, groupId } = req.body;
    console.log("The body is here:", req.body, "\n\n");
    try {
        const fromid = new mongoose.Types.ObjectId(from as string);
        const toid = to ? new mongoose.Types.ObjectId(to as string) : null;
        console.log("Converted ObjectIds:", { fromid, toid });

        if (type === "direct") {

            if (!toid) {
                return res.status(400).json({ success: false, message: "Recipient 'toid' is required for direct messages." });
            }


            const response = await User.findById(fromid).populate({ path: "p2pChatIds.users.user", select: "name username email" })
            
            const toUser = await User.findById(toid)
                .populate({
                    path: "p2pChatIds.users.messages",
                    model: "Message",
                });
            if (!response || !toUser) {
                return res.status(404).json({ success: false, message: "One or both users not found." });
            }


            if (!response) {
                //@ts-ignore
                return response.status(404).json({ success: false, message: "User not found." });
            }
            const newMessage = new Message({
                from: fromid,
                to: toid,
                message,
                type: "direct",
            });

            await newMessage.save();

            // Find the chat entry for the specified recipient
            const chatEntry = response.p2pChatIds.find((chat) =>
                chat.users.some((u: { user: any }) => u.user.equals(toid))
            );

            if (chatEntry) {
                // If chat exists, add the new message to the correct entry
                const userEntry = chatEntry.users.find((u: { user: any }) => u.user.equals(toid));
                if (userEntry) {

                    userEntry.messages.push(newMessage._id as any);
                } else {
                    // if user entry doesn't exist then creating a new user entry
                    chatEntry.users.push({
                        user: toid,
                        messages: [newMessage._id],
                    });
                }
            } else {
                // if user entry doesn't exist then creating a new user entry
                response.p2pChatIds.push({
                    users: [
                        {
                            user: toid,
                            messages: [newMessage._id],
                        },
                    ],
                });
            }


            await response.save();



            // to_user messgae updated.
            const toChatEntry = toUser.p2pChatIds.find((chat) =>
                chat.users.some((u: { user: any }) => u.user.equals(fromid))
            );

            if (toChatEntry) {
                const toUserEntry = toChatEntry.users.find((u: { user: any }) => u.user.equals(fromid));
                if (toUserEntry) {
                    toUserEntry.messages.push(newMessage._id as any);
                } else {
                    toChatEntry.users.push({
                        user: fromid,
                        messages: [newMessage._id],
                    });
                }
            } else {
                toUser.p2pChatIds.push({
                    users: [
                        {
                            user: fromid,
                            messages: [newMessage._id],
                        },
                    ],
                });
            }

            await toUser.save();


            // Re-Populate or Re-Fetch Data :
            // To ensure response includes the latest updates, re-populate it after saving:
            const updatedResponse = await User.findById(fromid)
                                    .populate({ path: "p2pChatIds.users.user", select: "name username email" })
                                    .populate({ path: "p2pChatIds.users.messages", model: "Message" });

            return res.status(200).json({
                message: "yes message is sent.",
                ResponseData: updatedResponse
            })

        } else{

            try {
               
        
                // Validate sender
                const sender = await User.findById(fromid);
                if (!sender) {
                    return res.status(404).json({ success: false, message: "Sender not found." });
                }
        
                // Validate group
                const group = await Group.findById(groupId).populate("members.userId");
                if (!group) {
                    return res.status(404).json({ success: false, message: "Group not found." });
                }
        
                // Check if the sender is a member of the group
                const isMember = group.members.some((member:any) => member.userId.equals(fromid));
                if (!isMember) {
                    return res.status(403).json({ success: false, message: "Sender is not a member of the group." });
                }
        
                // Create the message
                const newMessage = new Message({
                    from: fromid,
                    groupId: groupId,
                    message,
                    type: "group",
                });
                await newMessage.save();
        
                // Update the group's messages array
                group.messages.push(newMessage._id);
                await group.save();
        
                // Add the groupId to the user's `Groups` field if not already present
                const userGroupExists = sender.Groups.some((groupEntry) => groupEntry.groups.some((g:any) => g.groupid.equals(groupId)));
                if (!userGroupExists) {
                    sender.Groups.push({ groups: [{ groupid: groupId }] });
                    await sender.save();
                }
        
                return res.status(200).json({
                    success: true,
                    message: "Message sent to group successfully.",
                    data: { group, newMessage },
                });
            } catch (error) {
                console.error("Error sending message to group:", error);
                return res.status(500).json({ success: false, message: "Internal server error." });
            }
        }
        
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ success: false, message: "Failed to send message." });
    }
};
