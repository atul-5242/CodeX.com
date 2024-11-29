
















// ----------------------------------------------------------------------
// import WebSocket,{WebSocketServer} from "ws";

// const wss=new WebSocketServer({port:8080});
// interface User{
//     socket:WebSocket,
//     userId?:string,
//     userSno?:number
// }

// let allSocket:User[]=[];
// let cnt=0;
// wss.on("connection",(socket:WebSocket)=>{
//     cnt++;
//     allSocket.push({
//         socket:socket,
//         userId:(cnt).toString(),
//         userSno:cnt,
//     })
//     socket.send(`Hello User ${allSocket.find(user=>user.socket==socket)?.userId}`);
    
//     socket.on("message",(event)=>{
        
//         let reciver=allSocket.find(user=>user.userId==JSON.parse(event as unknown as string).userId);
        
//         reciver?.socket.send(JSON.parse(event as unknown as string).message.toString());

//     })  
//     socket.on("close",()=>{
//         allSocket=allSocket.filter(user=>user.socket!=socket);
//         cnt--;
//     })
// });
// --------------------------------------------------------
// function hello(){
//     setInterval(()=>{
//         socket.send(`Hello everyuser`)
//     },2000)
// }
// // hello();
// // message
// // let sender=allSocket.find(user=>user.userId=="1");
// // let reciver=allSocket.find(user=>user.userId=="2");


































// ----------------------------------------CHAT GPT--------------------------------------------
// import WebSocket, { WebSocketServer } from "ws";

// // Initialize the WebSocket server
// const wss = new WebSocketServer({ port: 3098 });

// // Define the User interface to store user information
// interface User {
//   socket: WebSocket;
//   id: number;
// }

// // Initialize the array to hold all connected users
// let allSocket: User[] = [];
// let userCount = 0;  // This will track the number of users

// // Handle new connections to the WebSocket server
// wss.on("connection", (socket: WebSocket) => {
//   // Increment user count for each new connection
//   userCount++;

//   // Create a user object for the connected socket with a unique ID
//   const user: User = { socket, id: userCount };

//   // Add the user to the allSocket array
//   allSocket.push(user);

//   // Log the new user connection with their user number (e.g., User 1, User 2, etc.)
//   console.log(`User ${user.id} is connected.`);

//   // Send a welcome message to the new user
//   socket.send(`Hello User ${user.id}, nice to meet you!`);

//   // Handle incoming messages from the connected user
//   socket.on("message", (event) => {
//     console.log(`Message from User ${user.id}:`, event.toString());
//   });

//   // Handle when a user disconnects (closes the connection)
//   socket.on("close", () => {
//     // Remove the user from the allSocket array
//     allSocket = allSocket.filter((u) => u.socket !== socket);

//     // Log the disconnection of the user
//     console.log(`User ${user.id} disconnected.`);
//   });
// });
// ------------------------------------------------------------------------------------