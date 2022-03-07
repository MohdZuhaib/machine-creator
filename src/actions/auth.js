import {NAME, 
        LOGIN_START,
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        SIGNUP_START,
        SIGNUP_FAILED,
        SIGNUP_SUCCESS,
        LOGOUT,
        AUTHENTICATE_USER,
    } from "./actionTypes"
import ApiConfig from "../config/ApiConfig";
import axios from "axios";


export function startLogin(){
    console.log("caling startlogin action");
    return{
        type:LOGIN_START,
    }

}
export function loginFailed(errorMessage){
    return{
        type:LOGIN_FAILED,
        error:errorMessage
    }

}
export function loginSuccess(user){
    console.log("userrrrr",user);
    return{
        type:LOGIN_SUCCESS,
        user:user
    }

}
export function login(values){
    console.log("calling api");
    console.log("values",values)
    return async (dispatch)=>{
      const response = await  axios.post(ApiConfig.auth.login, values);
      console.log("API res", response);
      console.log("api again",response.data.data.success);
      console.log("esbar user b",response.data.data.user);
      if(response.data.data.success==true){
        console.log("token",response.data.data.token);
        console.log("user",response.data.data.user);
        localStorage.setItem("token",response.data.data.token);
        console.log("login success");
        
        dispatch(loginSuccess(response.data.data.user));

        

      }else{
          dispatch(response.data.message);

        


      }
  
    //   localStorage.setItem("token", response.data.data.token);
}
    
}

export function authenticateUser(user){
    return{
        type:AUTHENTICATE_USER,
        user:user
    }

}