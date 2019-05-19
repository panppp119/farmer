import request from 'utils/request'
import { push } from "react-router-redux";

import { addFlashMessage } from './ui'

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCEEDED = "SIGN_IN_SUCCEEDED";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCEEDED = "SIGN_OUT_SUCCEEDED";

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
      }

      dispatch(push("/"));
    })
};

export const register = (data, schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_IN, schema });

  return request.post('/sign_up')
    .send(data)
    .then(response => {
      localStorage.setItem("token", response.body.access_token);

      dispatch({ type: SIGN_IN_SUCCEEDED, schema, response });
      dispatch(push("/"));
    })
};

export const signout = (schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_OUT, schema });

  return request.post('/sign_out')
    .then(response => {
      localStorage.removeItem("token");

      dispatch({ type: SIGN_OUT_SUCCEEDED });
      dispatch(push("/sign_out"));
    })
};
