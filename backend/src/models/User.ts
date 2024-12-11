import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    p2pChatIds: [
        {
            users: [
                {
                    user: {
                        type: mongoose.Types.ObjectId,  
                        ref: "User",
                        required: true,
                    },
                    messages: [
                        {
                            type: mongoose.Types.ObjectId,
                            ref: "Message",
                        },
                    ],
                },
            ],
        },
    ], 
    Groups:[
        {
            groups:[
                {
                    groupid:{
                        type: mongoose.Types.ObjectId,  
                        ref: "Group"
                    },
                }
            ]
        }
    ]
});

export const User = model("User", UserSchema);
