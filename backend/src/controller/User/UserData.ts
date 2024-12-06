import { User } from "../../models/User";
import { Request,Response } from "express";

export const getAllUser = async (req:Request,res:Response):Promise<any> =>{

    try {
        const userData=await User.find({}).populate("name");
        if(!userData) 
            return res.status(404).json({
                message:"No user data found"
            });
        return res.status(200).json({
            message:"User Data fetched successfully",
            userData:userData,
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"+error,
        });
    }
}
export const getUserById = async (req:Request,res:Response):Promise<any> =>{
    const userId=req.body;
    try {
        const userData=await User.findById(userId);
        if(!userData) 
            return res.status(404).json({
                message:"No user data found"
            });
        return res.status(200).json({
            message:"User Data fetched successfully",
            userData:userData,
        });
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"+error,
        });
    }
}
