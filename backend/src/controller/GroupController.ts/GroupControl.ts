import { Request, Response } from "express";
import { Group } from "../../models/GroupsModel";
import { User } from "../../models/User";
import { Message } from "../../models//messageModel";
import mongoose from "mongoose";

// Create a new group
export const createGroup = async (req: Request, res: Response): Promise<Response> => {
    const { groupName, groupImg, description, members } = req.body;
    const member_id = members ? new mongoose.Types.ObjectId(members as string) : null;
    try {
        const newGroup = new Group({
            groupName,
            groupImg,
            description,
            members:[{userId:member_id}]
        });

        const savedGroup = await newGroup.save();

        // finding that user and update its groupsId
        const userVal=await User.findById(member_id);
        if(userVal?.Groups.find(group=>group.groups.some((g:any)=>g.groupid.equals(savedGroup._id)))){
            return res.status(400).json({ success: false, message: "User already in group" });
        }
        userVal?.Groups.push({
            groups:[{
                groupid:savedGroup._id
            }]
        })
        await userVal?.save();

        return res.status(201).json({ success: true, group: savedGroup });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const addMembers = async (req: Request, res: Response): Promise<Response> => {
    const { member, groupid } = req.body;
    console.log("object")
    try {
        const id_=new mongoose.Types.ObjectId(groupid as string);
        console.log("Id",id_)
        const group = await Group.findById(id_);
        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }
        const member_id = member ? new mongoose.Types.ObjectId(member as string) : null;
        group.members.push({
            userId: member_id
        })
        await group.save();
        const userVal=await User.findById(member_id);
        if(userVal?.Groups.find(group=>group.groups.some((g:any)=>g.groupid.equals(group._id)))){
            return res.status(400).json({ success: false, message: "User already in group" });
        }
        userVal?.Groups.push({
            groups:[{
                groupid:group._id
            }]
        })
        await userVal?.save();
        return res.status(200).json({ success: true, message: "Members added successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// // Get all groups
// export const getAllGroups = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const groups = await Group.find().populate("members.userId", "username email").populate("messages");
//         return res.status(200).json({ success: true, groups });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get a specific group by ID
// export const getGroupById = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     try {
//         const group = await Group.findById(id)
//             .populate("members.userId", "username email")
//             .populate("messages");

//         if (!group) {
//             return res.status(404).json({ success: false, message: "Group not found" });
//         }

//         return res.status(200).json({ success: true, group });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update a group
// export const updateGroup = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const { groupName, groupImg, description, members } = req.body;

//     try {
//         const updatedGroup = await Group.findByIdAndUpdate(
//             id,
//             { groupName, groupImg, description, members },
//             { new: true }
//         );

//         if (!updatedGroup) {
//             return res.status(404).json({ success: false, message: "Group not found" });
//         }

//         return res.status(200).json({ success: true, group: updatedGroup });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Delete a group
// export const deleteGroup = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     try {
//         const deletedGroup = await Group.findByIdAndDelete(id);

//         if (!deletedGroup) {
//             return res.status(404).json({ success: false, message: "Group not found" });
//         }

//         // Remove group reference from members' `Groups` field
//         await Promise.all(
//             deletedGroup.members.map(async (member: { userId: string }) => {
//                 await User.findByIdAndUpdate(member.userId, {
//                     $pull: { "Groups.groups": { groupid: id } },
//                 });
//             })
//         );

//         return res.status(200).json({ success: true, message: "Group deleted" });
//     } catch (error: any) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };
