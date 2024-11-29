import mongoose from "mongoose";

// Define message schema
const messageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String },
    message: { type: String, required: true },
    type: { type: String, enum: ['direct', 'group'], required: true },
    groupId: { type: String }, // Optional, for group messages
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
