import {
  NAME,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGOUT,
  AUTHENTICATE_USER,
} from "./actionTypes";
import ApiConfig from "../config/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";

export function startLogin() {
  console.log("caling startlogin action");
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  console.log("userrrrr", user);
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}
export function login(values, navigate) {
  console.log("calling api");
  console.log("values", values);
  return async (dispatch) => {
    try {
      const response = await axios.post(ApiConfig.auth.login, values);
      localStorage.setItem("token", response.data.token);
      console.log("login success");
      dispatch(loginSuccess(response.data.user));
    } catch (err) {
      console.log("Error", err.response.data.message);
      toast.error(err.response.data.message)
    }

    // if (response.data.success) {
    //   console.log("token", response.data.token);
    //   console.log("user", response.data.user);

    //   navigate("/dashboard");
    // } else {
    //   console.log("Error", response.message);
    //   dispatch(response.data.message);
    // }

    //   localStorage.setItem("token", response.data.data.token);
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}
