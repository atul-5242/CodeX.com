import mongoose, { Schema, model } from "mongoose";

// Predefined interests for software development
const predefinedInterests = [
    "Web Development",
    "Android Development",
    "Machine Learning",
    "React.js",
    "Node.js",
    "Python Programming",
    "UI/UX Design",
    "Data Science",
    "Blockchain",
    "Cloud Computing",
    "Cybersecurity",
    "Game Development",
    "Artificial Intelligence",
    "Database Management",
    "DevOps",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Java Programming",
    "PHP Development"
];

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
    Groups: [
        {
            groups: [
                {
                    groupid: {
                        type: mongoose.Types.ObjectId,  
                        ref: "Group",
                    },
                },
            ],
        },
    ],
    Mutual_Approvals: [
        {
            type: mongoose.Types.ObjectId,  
            ref: "User",
            required: true,
        },
    ],
    Invitaion: {
        SentRequest: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        Approval_Needed_Request: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        Rejected_Request: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
    },
    Interest: {
        type: [String],
        enum: predefinedInterests, // Restricting to predefined software development interests
        default: [], // Default to an empty array if no interests are set
    }
});

export const User = model("User", UserSchema);
