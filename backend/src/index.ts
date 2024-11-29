import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/Authentication/authRoutes";
import { userMiddleware } from "./middleware/auth";
import WebSocket,{WebSocketServer} from "ws";
import { SocketManager } from "./SocketManager/SocketMange";
import ChatRoute from "./routes/chatRoutes";

export const wss=new WebSocketServer({port:8080});
const socketManager = new SocketManager(8080); // WebSocket server on port 8080
const app = express();

app.use(express.json());// for parsing json
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use("/api/auth",authRoutes);
app.use("/api/chat",ChatRoute);
app.use(userMiddleware as any);


mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/ChatApp");

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});