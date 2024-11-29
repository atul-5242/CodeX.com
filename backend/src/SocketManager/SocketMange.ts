import { WebSocketServer, WebSocket } from 'ws';
import { Request } from 'express';
import { User } from '../controller/chatController'; // Import User interface for tracking connections

export class SocketManager {
    private allSockets: User[] = []; // Stores WebSocket connections and their associated userIds
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        this.wss.on("connection", this.onConnection.bind(this)); // Bind connection handler
    }

    private onConnection(socket: WebSocket) {
        socket.on("message", (data) => this.onMessage(socket, data)); // Handle incoming messages
        socket.on("close", () => this.onClose(socket)); // Handle socket closure        
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
    public addSocket(socket: WebSocket, userId: string) {
        this.allSockets.push({ socket, userId });
    }
}
    