import { useEffect, useRef, useState } from "react";
import { getAllUserData } from "../../Services/Operations/UserSpecific/UserCall";
import { useSelector } from "react-redux";
import {
  CREATE_CHAT_BY_ID_API,
  getAll_Messages_ByID,
} from "../../Services/Operations/ChatCall/ChatapiCall";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userTitle, setUserTitle] = useState("");
  const [current_Selected_User, set_current_Selected_User] = useState({});
  
  // @ts-ignore
  const { UserData } = useSelector((state) => state.auth);
  // @ts-ignore
  const { token } = useSelector((state) => state.auth);
  
  const inputRef = useRef();
  const wsRef = useRef();
  const messagesEndRef = useRef(null);
  const [alluser, setAllUser] = useState([]);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  async function isUserChanged_Reset_message(id) {
    // @ts-ignore
    const requestedUserID = UserData._id;
    const CurrentUserMessage = await getAll_Messages_ByID({
      id,
      requestedUserID,
    })();
    // @ts-ignore
    const dataMessage = CurrentUserMessage?.data;
    setMessages([]);

    if (Array.isArray(dataMessage?.responseDataMessage)) {
      setMessages(dataMessage?.responseDataMessage);
    } else {
      setMessages([]);
    }
  }

  const UserDataHandler = (id) => {
    // @ts-ignore
    setUserTitle(alluser.find((user) => user._id === id)?.name);
    // @ts-ignore
    const user = alluser.find((user) => user._id === id);
    if (!user) return;
    set_current_Selected_User(user);
    isUserChanged_Reset_message(id);
  };

  useEffect(() => {
    const allUser = async () => {
      try {
        // @ts-ignore
        const response = await getAllUserData({ token })();
        setAllUser(response?.data?.userData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    allUser();

    // @ts-ignore
    const ws = new WebSocket(`ws://localhost:8082?token=${token}`);
    ws.onmessage = (event) => {
      const Resposne_data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, Resposne_data]);
    };
    // @ts-ignore
    wsRef.current = ws;

    return () => ws.close();
  }, [token]);

  const sendingMessage = (message) => {
    // @ts-ignore
    const messageText = inputRef.current?.value;
    if (messageText && current_Selected_User) {
      const messagePayload = {
        type: "direct",
        // @ts-ignore
        from: UserData._id,
        // @ts-ignore
        to: current_Selected_User._id,
        message: messageText,
      };
      // @ts-ignore
      wsRef.current?.send(JSON.stringify(messagePayload));
      setMessages((prevMessages) => [
        ...prevMessages,
        // @ts-ignore
        { ...messagePayload, from: UserData._id },
      ]);
      // @ts-ignore
      inputRef.current.value = "";
      // @ts-ignore
      CREATE_CHAT_BY_ID_API(messagePayload, { token })();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Left Sidebar */}
      <div className="w-1/3 max-w-md bg-white shadow-xl rounded-l-2xl overflow-hidden flex flex-col">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
              // @ts-ignore
              style={{ backgroundColor: UserData.avatarColor }}
            >
              {/* @ts-ignore */}
              {UserData.name?.charAt(0)}
            </div>
            <div>
              {/* @ts-ignore */}
              <h1 className="text-xl font-bold text-white">{UserData.name}</h1>
              <p className="text-sm text-purple-100">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h2 className="px-4 py-3 text-sm font-semibold text-gray-500">Contacts</h2>
          <div className="space-y-1 px-2">
            {alluser.map((user, index) => {
              // @ts-ignore
              if (user._id === UserData._id) return null;
              return (
                <div
                  key={index}
                  onClick={() => UserDataHandler(user._id)}
                  className="flex items-center p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                      // @ts-ignore
                      style={{ backgroundColor: user.avatarColor }}
                    >
                      {/* @ts-ignore */}
                      {user.name?.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    {/* @ts-ignore */}
                    <h2 className="font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">Active now</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-white shadow-xl rounded-r-2xl overflow-hidden">
        {userTitle ? (
          <>
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-500">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  // @ts-ignore
                  style={{ backgroundColor: current_Selected_User.avatarColor }}
                >
                  {/* @ts-ignore */}
                  {current_Selected_User.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{userTitle}</h2>
                  <p className="text-sm text-purple-100">typing...</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      // @ts-ignore
                      className={`flex ${message.from === UserData._id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        // @ts-ignore
                        className={`max-w-md p-3 rounded-2xl ${
                          // @ts-ignore
                          message.from === UserData._id
                            ? "bg-purple-600 text-white rounded-br-none"
                            : "bg-white shadow-sm rounded-bl-none"
                        }`}
                      >
                        {/* @ts-ignore */}
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date().toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendingMessage(inputRef.current?.value);
                  }}
                  className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Type your message..."
                />
                <button
                  onClick={() => sendingMessage(inputRef.current?.value)}
                  className="px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-16 w-16 text-purple-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium">Select a chat to start messaging</h3>
              <p className="mt-1 text-sm">Choose from your existing conversations or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;