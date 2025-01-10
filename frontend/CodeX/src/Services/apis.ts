const REACT_APP_BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("Here is the BASE_URL",REACT_APP_BASE_URL);
// Auth Endpoints:
export const AuthEndPoints = {
    LOGIN_API:REACT_APP_BASE_URL+"/auth/login",
    SIGNIN_API:REACT_APP_BASE_URL+"/auth/signIn",
}

// User Endpoints:
export const UserEndPoints = {
    GET_ALL_USER_API:REACT_APP_BASE_URL+"/user/getAllUser",
    GET_USER_BY_ID_API:REACT_APP_BASE_URL+"/user/getUserById",
}

export const ChatEndPoints = {
    GET_ALL_MESSAGES_BY_ID_API:REACT_APP_BASE_URL+"/chat/getChatById",
    CREATE_CHAT_BY_ID_API:REACT_APP_BASE_URL+"/chat/sendMessage",
}