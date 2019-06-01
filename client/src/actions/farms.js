import request from "utils/request";

import { addFlashMessage } from "./ui";

export const FETCH_FARMS = "FETCH_FARMS";
export const FETCH_FARMS_SUCCEEDED = "FETCH_FARMS_SUCCEEDED";
export const ADD_FARM = "ADD_FARM";
export const ADD_FARM_SUCCEEDED = "ADD_FARM_SUCCEEDED";
export const UPDATE_FARM = "UPDATE_FARM";
export const UPDATE_FARM_SUCCEEDED = "UPDATE_FARM_SUCCEEDED";
export const DELETE_FARM = "DELETE_FARM";
export const DELETE_FARM_SUCCEEDED = "DELETE_FARM_SUCCEEDED";

export const fetchFarms = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_FARMS, schema });

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
        dispatch({ type: FETCH_FARMS_SUCCEEDED, schema, response });
      }
    });
};

export const addFarm = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_FARM, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";
  const farms = data;

  var req = request.post(url).accessToken(accessToken);

  farms.map(farm => req.send(farm));

  return req.then(response => {
    dispatch({ type: ADD_FARM_SUCCEEDED, schema, response });
  });
};

export const updateFarm = (id, data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_FARM, schema });

  const url = `/${schema._key}/${id}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_FARM_SUCCEEDED, schema, response });
    });
};

export const deleteFarm = schema => (dispatch, getState) => {
  dispatch({ type: DELETE_FARM, schema });

  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  const url = `/${schema._key}`;

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_FARM_SUCCEEDED, schema });
    });
};
