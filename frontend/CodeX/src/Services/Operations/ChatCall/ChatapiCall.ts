import { apiConnector } from "../../apiConnector";
import { ChatEndPoints } from "../../apis";


export const CREATE_CHAT_BY_ID_API=(body)=>{
    return async ()=>{
        try {
            console.log("geting AllUserData");
            const response = await apiConnector("POST",ChatEndPoints.CREATE_CHAT_BY_ID_API,body,null,null);
            console.log("CREATE_CHAT_BY_ID_API response",response);
            return response;
        } catch (error) {
            console.log("CREATE_CHAT_BY_ID_API failed",error);
        }
    }
}