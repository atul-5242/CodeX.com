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
  "PHP Development",
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
  accountType:{
    type:String,
    enum:["Admin","Customer"],
},
  p2pChatIds: [
    {
      users: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          messages: [
            {
              type: Schema.Types.ObjectId,
              ref: "Message",
            },
          ],
        },
      ],
    },
  ],
  Groups: [{
    type: Schema.Types.ObjectId,
    ref: "Group",
  }],
  Mutual_Approvals: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  Invitaion: {
    SentRequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    Approval_Needed_Request: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    Rejected_Request: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  Interest: {
    type: [String],
    enum: predefinedInterests,
    default: [],
  },
});

export const User = model("User", UserSchema);
