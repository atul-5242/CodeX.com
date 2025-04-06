import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/Authentication/authRoutes";
// import { authenticateToken } from "./middleware/auth";
// import WebSocket,{WebSocketServer} from "ws";
import { SocketManager } from "./SocketManager/SocketMange";
import ChatRoute from "./routes/p2pchatRoutes/chatRoutes";
import UserRoute from "./routes/UserRoute/User_Route";
import dotenv from "dotenv";
import RequestHandleRoute from "./routes/RequestHandling/requesthandle";
import GroupRoute from "./routes/GroupChat/GroupChatRoute";
dotenv.config();
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
app.use("/api/p2p-routes",ChatRoute);
app.use("/api/user",UserRoute);
app.use("/api/group-routes",GroupRoute);
app.use("/api/connection-request",RequestHandleRoute);

app.get("/healthcheck", (req, res) => {
    res.send("Server is running up...");
});
// app.use(userMiddleware as any);

// console.log("process.env.DATABASE_URL",process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/ChatApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));


app.listen(process.env.PORT || 3002, () => {
    console.log("Express Server is running on port 3002");
});