import request from 'utils/request'
import { push } from "react-router-redux";

import { addFlashMessage } from './ui'
import { fetchUser } from "./user";
import userSchema from 'schemas/user'

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCEEDED = "SIGN_IN_SUCCEEDED";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCEEDED = "SIGN_UP_SUCCEEDED";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCEEDED = "SIGN_OUT_SUCCEEDED";
export const CHECK_SESSION = "CHECK_SESSION";

export const signin = (data, schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_IN, schema });

  return request.post('/sign_in')
    .send(data)
    .then(response => {
      if (response.body.error) {
        dispatch(addFlashMessage({
          type: 'error',
          text: response.body.error
        }));
      }
      else {
        localStorage.setItem("token", response.body.access_token);
        dispatch({ type: SIGN_IN_SUCCEEDED, schema, response });
        dispatch(push("/"));
        dispatch(addFlashMessage({
          type: 'success',
          text: `ยินดีต้อนรับเข้าสู่ระบบ`
        }));
      }
    })
};

export const register = (data, schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_UP, schema });

  return request.post('/sign_up')
    .send(data)
    .then(response => {
      localStorage.setItem("token", response.body.access_token);

      dispatch({ type: SIGN_UP_SUCCEEDED, schema, response });
      dispatch(fetchUser(userSchema));
      dispatch(push('/'))
    })
    .catch(error => {
      dispatch(addFlashMessage({
        type: 'error',
        text: error
      }))
    })
};

export const signout = (schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_OUT, schema });

  const accessToken = getState().getIn(['auth', 'access_token']) || ''

  return request.post('/sign_out')
    .accessToken(accessToken)
    .then(response => {
      localStorage.removeItem("token");

      dispatch({ type: SIGN_OUT_SUCCEEDED });
      dispatch(push("/sign_in"));
    })
};

export const checkSession = (schema) => (dispatch, getState) => {
  let token = localStorage.getItem("token");

  if (token !== null || token !== undefined) {
    dispatch({ type: CHECK_SESSION, token });
    dispatch(fetchUser(userSchema));
  }
  else {
    dispatch(signout());
  }
};
