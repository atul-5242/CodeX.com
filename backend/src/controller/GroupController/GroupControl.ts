import { Request, Response } from "express";
import { Group } from "../../models/GroupsModel";
import { User } from "../../models/User";
import { Message } from "../../models/messageModel";
import { Types } from "mongoose";

// Create a new group
export const createGroup = async (req: Request, res: Response): Promise<void> => {
    const { groupName, groupImg, description, members } = req.body;
    const member_id = members ? Types.ObjectId.createFromHexString(members) : null;
    try {
        const newGroup = new Group({
            groupName,
            groupImg,
            description,
            members: member_id ? [member_id] : []
        });

        const savedGroup = await newGroup.save();

        // Add group to user's Groups array
        if (member_id) {
            const user = await User.findById(member_id);
            if (!user) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }

            // Check if user is already in the group
            if (user.Groups.some(groupId => groupId.equals(savedGroup._id))) {
                res.status(400).json({ success: false, message: "User already in group" });
                return;
            }

            // Add group to user's Groups array
            user.Groups.push(savedGroup._id);
            await user.save();
        }

        res.status(201).json({ success: true, group: savedGroup });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addMembers = async (req: Request, res: Response): Promise<Response> => {
    const { member, groupid } = req.body;
    try {
        const group_id = Types.ObjectId.createFromHexString(groupid);
        const group = await Group.findById(group_id);
        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        const member_id = member ? Types.ObjectId.createFromHexString(member) : null;
        if (!member_id) {
            return res.status(400).json({ success: false, message: "Invalid member ID" });
        }

        // Check if member already exists in group
        if (group.members.some(existingMember => existingMember.equals(member_id))) {
            return res.status(400).json({ success: false, message: "User already in group" });
        }

        // Add member to group
        group.members.push(member_id);
        await group.save();

        // Add group to user's Groups array
        const user = await User.findById(member_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.Groups.some(groupId => groupId.equals(group._id))) {
            user.Groups.push(group._id);
            await user.save();
        }

        return res.status(200).json({ success: true, message: "Member added successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get all groups
export const getAllGroups = async (req: Request, res: Response): Promise<Response> => {
    try {
        const groups = await Group.find().populate("members", "username email").populate("messages");
        return res.status(200).json({ success: true, groups });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get a specific group by ID
export const getGroupById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.query;
    try {
        const group = await Group.findById(id)
            .populate("members", "username email")
            .populate("messages");

        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        return res.status(200).json({ success: true, group });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Update a group
export const updateGroup = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.query;
    const { groupName, groupImg, description } = req.body;

    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { groupName, groupImg, description },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        return res.status(200).json({ success: true, group: updatedGroup });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a group
export const deleteGroup = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try {
        const group = await Group.findById(id);
        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // Remove group reference from all members' Groups array
        await User.updateMany(
            { _id: { $in: group.members } },
            { $pull: { Groups: group._id } }
        );

        // Delete the group
        await Group.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Group deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Send Message to Group
export const sendGroupMessage = async (req: Request, res: Response): Promise<void> => {
    const { groupId } = req.params;
    const { content, senderId, messageType = "text" } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).json({ success: false, message: "Group not found" });
            return;
        }

        // Check if sender is a member of the group
        if (!group.members.some(member => member.equals(Types.ObjectId.createFromHexString(senderId)))) {
            res.status(403).json({ success: false, message: "User is not a member of this group" });
            return;
        }

        // Create new message
        const newMessage = new Message({
            from: Types.ObjectId.createFromHexString(senderId),
            groupId: Types.ObjectId.createFromHexString(groupId),
            message: content,
            type: "group",
            messageType: messageType
        });

        const savedMessage = await newMessage.save();

        // Add message to group's messages array
        group.messages.push(savedMessage._id);
        await group.save();

        // Populate sender details in the saved message
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate("from", "username name email");

        res.status(201).json({ 
            success: true, 
            message: populatedMessage 
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Group Messages
export const getGroupMessages = async (req: Request, res: Response): Promise<void> => {
    const { groupId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            res.status(404).json({ success: false, message: "Group not found" });
            return;
        }

        // Convert page and limit to numbers and validate
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        
        // Calculate skip value for pagination
        const skip = (pageNum - 1) * limitNum;

        // Get messages with pagination
        const messages = await Message.find({ groupId: Types.ObjectId.createFromHexString(groupId) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .populate("from", "username name email");

        // Get total count of messages
        const totalMessages = await Message.countDocuments({ groupId: Types.ObjectId.createFromHexString(groupId) });

        res.status(200).json({
            success: true,
            messages,
            currentPage: pageNum,
            totalPages: Math.ceil(totalMessages / limitNum),
            totalMessages
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Group Message
export const deleteGroupMessage = async (req: Request, res: Response): Promise<void> => {
    const { groupId, messageId } = req.params;
    const { userId } = req.body;

    try {
        const message = await Message.findById(messageId);
        if (!message) {
            res.status(404).json({ success: false, message: "Message not found" });
            return;
        }

        if (!message.groupId || !message.groupId.equals(Types.ObjectId.createFromHexString(groupId))) {
            res.status(400).json({ success: false, message: "Message does not belong to this group" });
            return;
        }

        if (!message.from.equals(Types.ObjectId.createFromHexString(userId))) {
            res.status(403).json({ success: false, message: "Not authorized to delete this message" });
            return;
        }

        await Group.findByIdAndUpdate(groupId, {
            $pull: { messages: messageId }
        });

        await Message.findByIdAndDelete(messageId);

        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateGroupMessage = async (req: Request, res: Response): Promise<void> => {
    const { groupId, messageId } = req.params;
    const { content, userId } = req.body;

    try {
        const message = await Message.findById(messageId);
        if (!message) {
            res.status(404).json({ success: false, message: "Message not found" });
            return;
        }

        if (!message.groupId || !message.groupId.equals(Types.ObjectId.createFromHexString(groupId))) {
            res.status(400).json({ success: false, message: "Message does not belong to this group" });
            return;
        }

        if (!message.from.equals(Types.ObjectId.createFromHexString(userId))) {
            res.status(403).json({ success: false, message: "Not authorized to update this message" });
            return;
        }

        message.message = content;
        message.isEdited = true;
        await message.save();

        const updatedMessage = await Message.findById(messageId)
            .populate("from", "username name email");

        res.status(200).json({ success: true, message: updatedMessage });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};