import { apiConnector } from "../../apiConnector";
import { UserEndPoints } from "../../apis";


export const getAllUserData=({token})=>{
    return async ()=>{
        try {
            console.log("geting AllUserData");
            const response = await apiConnector("GET",UserEndPoints.GET_ALL_USER_API,null,
            {
                Authorization: `Bearer ${token}`, 
            },null);
            console.log("getAllUserData response",response);
            return response;
        } catch (error) {
            console.log("getAllUserData failed",error);
        }
    }
}