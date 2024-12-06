import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/Authentication/authRoutes";
import { userMiddleware } from "./middleware/auth";
import WebSocket,{WebSocketServer} from "ws";
import { SocketManager } from "./SocketManager/SocketMange";
import ChatRoute from "./routes/chatRoutes";
import UserRoute from "./routes/UserRoute/User_Route";

export const socketManager = new SocketManager(8082); // WebSocket server on port 8080
const app = express();


// const socket = new WebSocket('ws://localhost:3000', {            
//     headers: {                                                   
//         'Authorization': `Bearer ${storedJwtToken}`              ------CLIENT SIDE CODE Written Here for future refrence---------
//     }                                                            
// });                                                             



app.use(express.json());// for parsing json
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));

app.use("/api/auth",authRoutes);
app.use("/api/chat",ChatRoute);
app.use("/api/user",UserRoute);
// app.use(userMiddleware as any);


mongoose.connect(process.env.MONGO_URL || "mongodb+srv://atulfzdlko2001:CMeguoisxp33vKpJ@cluster0.w7u2ewk.mongodb.net/ChatApp");

app.listen(process.env.PORT || 3002, () => {
    console.log("Express Server is running on port 3002");
});