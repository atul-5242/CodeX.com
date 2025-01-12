import { apiConnector } from "../../apiConnector";
import { ChatEndPoints } from "../../apis";

// @ts-ignore
export const CREATE_CHAT_BY_ID_API=(body,{token})=>{
    return async ()=>{
        try {
            console.log("geting AllUserData");
            const response = await apiConnector("POST",ChatEndPoints.CREATE_CHAT_BY_ID_API,body,{
                Authorization: `Bearer ${token}`,
            },null);
            console.log("CREATE_CHAT_BY_ID_API response",response);
            return response;
        } catch (error) {
            console.log("CREATE_CHAT_BY_ID_API failed",error);
        }
    }
}

// @ts-ignore
export const getAll_Messages_ByID=(data)=>{

    return async ()=>{
        try {
            console.log("geting AllUserData Message atul",data.id);
            const response = await apiConnector("GET",`${ChatEndPoints.GET_ALL_MESSAGES_BY_ID_API}/${data.id}`,null,null,null);
            console.log("GET_ALL_MESSAGES_BY_ID_API response",response);
            return response;
        } catch (error) {
            console.log("GET_ALL_MESSAGES_BY_ID_API failed",error);
        }
    }
}