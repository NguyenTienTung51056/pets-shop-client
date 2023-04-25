import { loginFailure, loginStart, loginSuccess,logout } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutt = async (dispatch) => {
  try {
    await publicRequest.post("/auth/logout");
    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
}

export const register = async (dispatch,user) => {
  try {
    await publicRequest.post("/auth/register", user);
    dispatch(loginSuccess());
  } catch (error) {
    console.log(error);
  }
    
}

