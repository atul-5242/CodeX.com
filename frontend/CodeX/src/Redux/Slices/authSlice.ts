import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
    UserData: localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData") as string) : null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        },
        setUserData(state,value){
                state.UserData=value.payload;
        }
    }
})

export const {setToken,setUserData} = authSlice.actions;    //action is Automatically generated functions that trigger reducers.
export default authSlice.reducer;