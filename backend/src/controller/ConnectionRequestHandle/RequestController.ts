import { Request, Response } from "express";
import { User } from "../../models/User";
import mongoose from "mongoose";

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

export const sendRequest = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender ID and Receiver ID are required." });
        }

        // Add receiverId to the sender's SentRequest array
        await User.findByIdAndUpdate(
            senderId,
            { $addToSet: { "Invitaion.SentRequest": receiverId } },
            { new: true, session } // Use the session
        );

        // Add senderId to the receiver's Approval_Needed_Request array
        await User.findByIdAndUpdate(
            receiverId,
            { $addToSet: { "Invitaion.Approval_Needed_Request": senderId } },
            { new: true, session } 
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Request sent successfully." });
    } catch (error) {
        // Abort the transaction if an error occurs
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: "An error occurred while sending the request.", error });
    }
};

// Approve Request
export const approveRequest = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender ID and Receiver ID are required." });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Add senderId to receiver's Mutual_Approvals and remove it from Approval_Needed_Request
            await User.findByIdAndUpdate(
                receiverId,
                {
                    $addToSet: { Mutual_Approvals: senderId },
                    $pull: { "Invitaion.Approval_Needed_Request": senderId },
                },
                { new: true, session }
            );

            // Add receiverId to sender's Mutual_Approvals and remove it from SentRequest
            await User.findByIdAndUpdate(
                senderId,
                {
                    $addToSet: { Mutual_Approvals: receiverId },
                    $pull: { "Invitaion.SentRequest": receiverId },
                },
                { new: true, session }
            );

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({ message: "Request approved successfully." });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while approving the request.", error });
    }
};

// Reject Request
export const rejectRequest = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender ID and Receiver ID are required." });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Add senderId to receiver's Rejected_Request and remove it from Approval_Needed_Request
            await User.findByIdAndUpdate(
                receiverId,
                {
                    $addToSet: { "Invitaion.Rejected_Request": senderId },
                    $pull: { "Invitaion.Approval_Needed_Request": senderId },
                },
                { new: true, session }
            );

            // Add receiverId to sender's Rejected_Request and remove it from SentRequest
            await User.findByIdAndUpdate(
                senderId,
                {
                    $addToSet: { "Invitaion.Rejected_Request": receiverId }, // Add receiverId to sender's Rejected_Request
                    $pull: { "Invitaion.SentRequest": receiverId }, // Remove receiverId from sender's SentRequest
                },
                { new: true, session }
            );

            await session.commitTransaction();
            session.endSession();

            res.status(200).json({ message: "Request rejected successfully." });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while rejecting the request.", error });
    }
};

export const getAllUserInConnection = async (req: Request, res: Response) => {
    const { userId } = req.body; // Assuming the userId is passed as a route parameter

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Find the user with the given userId and populate the Mutual_Approvals field
        const user = await User.findById(userId)
            .select("Mutual_Approvals") 
            .populate("Mutual_Approvals", "username name email") 
            .lean(); // Convert the result to a plain object for easier manipulation

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ mutualConnections: user.Mutual_Approvals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching mutual connections.", error });
    }

}


export const addInterests = async (req: Request, res: Response) => {
    const { userId, interests } = req.body; // The user ID and interests to add

    // Ensure that the interests are part of the predefined list
    const validInterests = interests.filter((interest: string) =>
        predefinedInterests.includes(interest)
    );

    try {
        if (!userId || !validInterests.length) {
            return res.status(400).json({ message: "User ID and valid interests are required." });
        }

        // Update the user's interests
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { Interest: { $each: validInterests } } }, // Add interests without duplicates
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Interests updated successfully.", interests: user.Interest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating interests.", error });
    }
};


export const getAvailableInterests = async (req: Request, res: Response) => {
    try {
        // Return the predefined interests list for users to select from
        res.status(200).json({ interests: predefinedInterests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching available interests.", error });
    }
};
