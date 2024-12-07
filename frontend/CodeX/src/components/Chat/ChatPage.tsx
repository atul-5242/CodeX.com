import React, { useEffect, useRef, useState } from "react";
import { getAllUserData } from "../../Services/Operations/UserSpecific/UserCall";
import { useSelector } from "react-redux";

const ChatPage = () => {

  const [messageType, setMessageType] = useState();

  const [messages, setMessages] = useState([]);

  const [userTitle, setUserTitle] = useState("");
  const [current_Selected_User, set_current_Selected_User] = useState({});

  const { UserData } = useSelector((state) => state.auth);
  const [havePersonalUser, setHavePersonalUser] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const inputRef = useRef();
  const wsRef = useRef();

  const UserDataHandler = (id) => {
    console.log("The user id is here >>>>>>>>>>>>>>>>>", id);
    setUserTitle(alluser.find((user) => user._id === id)?.name);
    const user = alluser.find((user) => user._id === id);
    if (!user) {
      return;
    }
    set_current_Selected_User(user);

    // yes/no answer about whether the user is in the chat.
    const isInPersonalChat = UserData.p2pChatIds?.some((chat) =>
      chat.participants.some((participant) => participant.userId === id)
    );

    if (isInPersonalChat) {
      setHavePersonalUser(true);
    }
  };

  const [alluser, setAllUser] = useState([]);

  useEffect(() => {
    const allUser = async () => {
      try {
        const response = await getAllUserData()();
        console.log("response", response);
        setAllUser(response?.data?.userData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    allUser();



    // WebSocket Connection

    const ws= new WebSocket(`ws://localhost:8082?token=${token}`);
    ws.onmessage=(event)=>{
      const Resposne_data=JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, Resposne_data]);
    }
    wsRef.current=ws;

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onclose = () => console.log("Disconnected from WebSocket");

    return () => {
      ws.close();
    };
  }, [token]);



  const sendingMessage = (message) => {
    const messageText=inputRef.current?.value;
    if(messageText && current_Selected_User){
      const messagePayload={
        type: "direct",
        from: UserData._id,
        to: current_Selected_User._id,
        message: messageText,
    }

    wsRef.current?.send(JSON.stringify(messagePayload));


    // tHE TEXT That sended by the user is added to the messages array
    setMessages(prevMessages => [...prevMessages, {...messagePayload,from:UserData._id}]);
    inputRef.current.value="";
  }
  }
  return (
    <div>
      <div className="flex items-center h-screen bg-gray-900 justify-center flex-row">
        {/* Left Side Chat Area */}
        <div className="bg-gray-50 h-[36rem] w-[23rem] rounded-tl-2xl rounded-bl-2xl">
          <div className="mb-1 font-bold border-b-2 shadow-gray-300 shadow-xl py-4 text-4xl text-center text-black font-serif ">
            What's Up
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto h-[30rem]">
            {
              //@ts-ignore
              alluser.map((item, index) => {
                return (
                  <button
                    className=" bg-black text-white w-full p-3"
                    key={item._id}
                    onClick={() => {
                      UserDataHandler(item._id);
                    }}
                  >
                    <div className="flex  gap-5 items-center">
                      <div
                        className="bg-white rounded-full w-10 h-10"
                        style={{ backgroundColor: item.avatarColor }}
                      ></div>
                      <div>{item.name}</div>
                    </div>
                  </button>
                );
              })
            }
          </div>
        </div>

        {/* Right Chat Area */}
        <div
          className="bg-gradient-to-t py-10 w-[45rem] px-10 rounded-tr-2xl rounded-br-2xl h-[36rem]"
          style={{
            backgroundImage:
              "url('https://e0.pxfuel.com/wallpapers/540/950/desktop-wallpaper-pastel-pinterest-whatsapp-anime-quote-girly-cartoon.jpg')",
          }}
        >
          {userTitle ? (
            <div>
              {/* Name Line Bar */}
              <div className="text-center justify-start px-5 shadow-2xl border shadow-white items-center flex w-full bg-green-950 font-bold rounded-2xl text-white h-[3rem]">
                {userTitle}
              </div>

              {/* Messages */}
              <div className="flex flex-col">
                <div className="h-96 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-gray-300 p-4">
                  {messages.map((message, index) => {
                    return (
                      <div
                        className={`flex ${
                          message.from === UserData._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        key={index}
                      >
                        <div
                          className={`mb-2 ${
                            message.from === UserData._id
                              ? "bg-green-400"
                              : "bg-white"
                          } w-fit rounded-lg p-2`}
                          key={index}
                        >
                          {message.message}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-row mt-5 gap-2">
                  <input ref={inputRef}
                    className="bg-white focus:border-green-500 focus:ring focus:ring-green-300 w-full p-2 rounded-xl"
                    type="text"
                    placeholder="Type a message"
                  />
                  <button 
                  onClick={()=>{
                    const message=inputRef.current?.value;
                    if(message){
                      sendingMessage(message);
                    }
                  }}
                  
                  className="bg-black rounded-lg text-white p-3">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full text-4xl">
              Welcome to CodeX
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
