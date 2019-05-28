import request from "utils/request";

import { addFlashMessage } from "./ui";

export const FETCH_MARKET = "FETCH_MARKET";
export const FETCH_MARKET_SUCCEEDED = "FETCH_MARKET_SUCCEEDED";
export const ADD_MARKET = "ADD_MARKET";
export const ADD_MARKET_SUCCEEDED = "ADD_MARKET_SUCCEEDED";
export const UPDATE_MARKET = "UPDATE_MARKET";
export const UPDATE_MARKET_SUCCEEDED = "UPDATE_MARKET_SUCCEEDED";
export const DELETE_MARKET = "DELETE_MARKET";
export const DELETE_MARKET_SUCCEEDED = "DELETE_MARKET_SUCCEEDED";

export const fetchMarket = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_MARKET, schema });

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
        dispatch({ type: FETCH_MARKET_SUCCEEDED, schema, response });
      }
    });
};

export const addMarket = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_MARKET, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: ADD_MARKET_SUCCEEDED, schema, response });
    });
};

export const updateMarket = (data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_MARKET, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_MARKET_SUCCEEDED, schema, response });
    });
};

export const deleteMarket = (id, schema) => (dispatch, getState) => {
  dispatch({ type: DELETE_MARKET, schema });

  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  const url = `/${schema._key}/${id}`;

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_MARKET_SUCCEEDED, schema, response });
    });
};
