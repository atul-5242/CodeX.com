import { Request,Response } from "express";
import { User } from "../../models/User";
import  Jwt  from "jsonwebtoken";
import bcrpyt from "bcrypt";
export const login = async (req:Request,res:Response) =>{
    let username:string = req.body.username;
    let password:string = req.body.password;

    try {
        
        const userData=await User.findOne({username:username})
        
        if(!userData) return res.json({message:"User not exisit"});

        
        const isPasswordVaild= await bcrpyt.compare(password,userData?.password as string);
        if (!isPasswordVaild) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const JWT_SECRET = "ChatAppAtul";
        if (!JWT_SECRET) {
          return res.status(500).json({ message: "JWT_SECRET is missing" });
        }
    
        
        const token=Jwt.sign({id:userData._id,username:userData.username},JWT_SECRET,{
            expiresIn:"7d",
        });

        return res.status(200).json({
            message:"User loggedin.",
            token:token,
            user:userData,
        })


    } catch (e) {
        return res.status(500).json({
            message:"Internal Server error."+e,
        })
    }

}
