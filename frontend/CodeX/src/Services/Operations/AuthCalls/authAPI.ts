// import { redirect } from "react-router-dom"
import { setToken } from "../../../Redux/Slices/authSlice"
import { apiConnector } from "../../apiConnector"
import { AuthEndPoints } from "../../apis"


// @ts-ignore
export const loginAPI = (fromdata_LOGIN,navigate,dispatch) =>{
    // @ts-ignore
    return async ()=>{
        try {
            console.log("Login Api")
            const response = await apiConnector("POST",AuthEndPoints.LOGIN_API,fromdata_LOGIN,null,null);
            console.log("LOGIN_API Response:",response);

            if (!response.data.user) {
                throw new Error(response.data.message)
            }
            dispatch(setToken(response.data.token));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("UserData",JSON.stringify(response.data.user));
            navigate("/");
            window.location.reload();
            return response;
        } catch (error) {
            console.log("LOGIN_API failed",error)
        }
    }
}

// @ts-ignore
export const signInAPI = (fromdata_SIGNIN,navigate) =>{
    return async ()=>{
        try {
            console.log("Singin api")
            const response= await apiConnector("POST",AuthEndPoints.SIGNIN_API,fromdata_SIGNIN,null,null);
            console.log("SIGNIN_API reponse",response);
            if (!response.data.user) {
                throw new Error(response.data.message)
            }
            navigate("/logIn")
        } catch (error) {
            console.log("SIGNIN_API failed",error);
            navigate("/signup")
        }
    }
}