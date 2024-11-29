import { Request,Response } from "express";
import { UserModel } from "../../models/User";
import { z } from "zod";
import bcrypt from "bcrypt";



export const signIn = async (req:Request,res:Response) =>{


    // User Data Schema using Zod:
    const UserSchemaZod=z.object({
        name:z.string().min(1,"Name is required"),//1 refer that atleast 1 Character is present.
        username:z.string().min(1,"Username is required"),
        password:z.string()
                            .min(8,"Password must be min of 8 length")
                            .regex(/[a-z]/,"password must contain atleast one small charater")
                            .regex(/[A-Z]/,"password must contain atleast one capital charater")
                            .regex(/[0-9]/,"password must contain atleast one number")
                            .regex(/[^a-zA-Z0-9]/,"password must contain atleast one small charater"), //Excluding this all only special 
                                                                                                    // charater needed to be validate.                                                                                                  
        email:z.string().email("Invalid email format").min(1,"Email must be needed."),
    })

    try {

        let hashedPassword:string="";
        let username_:string = req.body.username;
        let name_:string = req.body.name;
        let password_:string = req.body.password;
        let confirmPassword_:string=req.body.confirmPassword;
        let email_:string=req.body.email;

        const UserData=UserSchemaZod.safeParse({
            name:name_,
            username:username_,
            password:password_,
            email:email_,
        })  

        if(!UserData.success){
            return res.status(400).json({
                message:"Invalid Data.",
                error:UserData.error.errors,
            })
        }
        if (password_ !== confirmPassword_) {
            return res.status(400).json({
              message: "Passwords do not match.",
            });
        }

        const existingUser = await UserModel.findOne({
            $or: [{ username_ }, { email_ }],
        });
        
        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already in use.",
            });
        }
            
        hashedPassword = await bcrypt.hash(password_,10);
            
        const dbUser=await UserModel.create({
            username:username_,
            password:hashedPassword,
            name:name_,
            email:email_,
        });

        if(dbUser){
            return res.status(200).json({
                message:"User created successfully.",
                user:dbUser,
            })
        }
        

    } 
    catch (e) {
        return res.status(500).json({
            message:"Internal Server error."+e,
        })
    }

}