import { WebSocketServer, WebSocket } from 'ws';
import {IncomingMessage} from 'http';
import { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';

interface User {
  socket: WebSocket;
  userId: string;
}

export class SocketManager {
    private allSockets: User[] = []; // Storing Web Socket connections and their userIds who is realted to there WebSocket.
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        console.log(`WebSocket server is running on port ${port}`);
        this.wss.on("connection", this.onConnection.bind(this)); // Bind connection handler
    }

    private authenticateSocket(socket: WebSocket, req: any): ObjectId | null {
        const url= new URL(req.url || "",`http://${req.headers.host}`);  //i have to understand this line .
        const token = url.searchParams.get("token");
        console.log("The Req.headers is here",req.headers);
        console.log("The Token is here",token);
        const JWT_SECRET = "ChatAppAtul";

        if (!token || !token.startsWith('Bearer ')) {
            socket.close();
            return null;
        }

        const decoded = this.verifyToken(token.split(' ')[1], JWT_SECRET);
        if (!decoded) {
            socket.close();
            return null;
        }
        return decoded.userId; 
    }


    private verifyToken(token: string, secret: string | undefined): any {
        try {
            if (!secret) {
                throw new Error('JWT_SECRET is missing');
            }
            return jwt.verify(token, secret);
        } catch (e) {
            return null;
        }
    }

    private onConnection(socket: WebSocket, req: IncomingMessage) {
        // console.log("Incomming message ",req)
        // User Authentication
        const userId = this.authenticateSocket(socket,req);
        // const userId = "674b5ed7a7a30ead2c8eff55"
        if (!userId){
            console.log("Problem in Authentication");
            return;  
        } 
            
        //Adding Socket
        if(userId){

            console.log("New connection established");
            this.addSocket(socket, userId);
            socket.on("message", (data) => this.onMessage(socket, data)); // Handle incoming messages
            socket.on("close", () => this.onClose(socket)); // Handle socket closure    
        }
}

    // Handle incoming messages
    private onMessage(socket: WebSocket, data: any) {
        const message = JSON.parse(data.toString());
        switch (message.type) {
            case "direct": // Handle direct message
                this.handleDirectMessage(message, socket);
                break;
            case "group": // Handle group message
                this.handleGroupMessage(message);
                break;
            default:
                break;
        }
    }



    // Handle direct messages between users
    private handleDirectMessage(message: any, socket: WebSocket) {
        const recipientSocket = this.allSockets.find((user) => user.userId === message.to);
        if (recipientSocket) {
            recipientSocket.socket.send(JSON.stringify({ from: message.from, message: message.message }));
        }
    }

    // Handle group messages, for simplicity broadcasting to all users
    private handleGroupMessage(message: any) {
        this.allSockets.forEach((user) => {
            user.socket.send(JSON.stringify({ from: message.from, groupMessage: message.message }));
        });
    }

    // Handle socket disconnection
    private onClose(socket: WebSocket) {
        this.allSockets = this.allSockets.filter(user =>( user.socket as any) !== socket);
    }

    // Add user socket to the list (user will be authenticated through middleware)
    public addSocket(socket: WebSocket, userId :any) {
        this.allSockets.push({ socket, userId });
    }
}
    