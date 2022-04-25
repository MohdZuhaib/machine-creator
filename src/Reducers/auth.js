import {NAME,
    LOGIN_START,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    LOGOUT,
    AUTHENTICATE_USER
} from "../actions/actionTypes"

const initialAuthState={
    user:{},
    isLoggedin:false,
    inProgress:false,
    error:null,
}
export default function auth(state=initialAuthState,action){
    console.log("first reducer called");
   if(action.type===LOGIN_START){
    return{
        ...state,
        inProgress:true
    }
   }
   else if(action.type===LOGIN_SUCCESS){
    return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };
       
   }
   else if(action.type===LOGIN_FAILED){
    return{
        ...state,
        inProgress:false,
        error:action.message
    }

   }
   else if(action.type===AUTHENTICATE_USER){
    return{
        ...state,
        isLoggedin:true,
        user:action.user
       }

   }
   else if(action.type===LOGOUT){
    return{
        ...state,
        user:{},
        isLoggedin:false
    }

   }
   return state
    


}