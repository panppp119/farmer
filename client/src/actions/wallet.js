import request from "utils/request";

import { addFlashMessage } from "./ui";

export const FETCH_WALLET = "FETCH_WALLET";
export const FETCH_WALLET_SUCCEEDED = "FETCH_WALLET_SUCCEEDED";
export const ADD_WALLET = "ADD_WALLET";
export const ADD_WALLET_SUCCEEDED = "ADD_WALLET_SUCCEEDED";
export const UPDATE_WALLET = "UPDATE_WALLET";
export const UPDATE_WALLET_SUCCEEDED = "UPDATE_WALLET_SUCCEEDED";
export const DELETE_WALLET = "DELETE_WALLET";
export const DELETE_WALLET_SUCCEEDED = "DELETE_WALLET_SUCCEEDED";

export const fetchWallet = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_WALLET, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      if (response.body.error) {
        dispatch(
          addFlashMessage({
            type: "error",
            text: response.body.error
          })
        );
      } else {
        dispatch({ type: FETCH_WALLET_SUCCEEDED, schema, response });
      }
    });
};

export const addWallet = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_WALLET, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: ADD_WALLET_SUCCEEDED, schema, response });
    });
};

export const updateWallet = (data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_WALLET, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_WALLET_SUCCEEDED, schema, response });
    });
};

export const deleteWallet = schema => (dispatch, getState) => {
  dispatch({ type: DELETE_WALLET, schema });

  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  const url = `/${schema._key}`;

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_WALLET_SUCCEEDED, schema });
    });
};
