// import {Websocket} from "ws";

import{ Schema, model } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require,
        unique:true
    },
})

export const UserModel = model("User",UserSchema); 