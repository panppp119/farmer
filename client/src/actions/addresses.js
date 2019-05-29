import request from "utils/request";

export const FETCH_ADDRESSES = "FETCH_ADDRESSES";
export const FETCH_ADDRESSES_SUCCEEDED = "FETCH_ADDRESSES_SUCCEEDED";
export const FETCH_ADDRESS = "FETCH_ADDRESS";
export const FETCH_ADDRESS_SUCCEEDED = "FETCH_ADDRESS_SUCCEEDED";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const ADD_ADDRESS_SUCCEEDED = "ADD_ADDRESS_SUCCEEDED";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_ADDRESS_SUCCEEDED = "UPDATE_ADDRESS_SUCCEEDED";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const DELETE_ADDRESS_SUCCEEDED = "DELETE_ADDRESS_SUCCEEDED";

export const fetchAddresses = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_ADDRESSES, schema });

  const url = `/${schema._key}es`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: FETCH_ADDRESSES_SUCCEEDED, schema, response });
    });
};

export const fetchAddress = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_ADDRESS, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: FETCH_ADDRESS_SUCCEEDED, schema, response });
    });
};

export const addAddress = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_ADDRESS, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: ADD_ADDRESS_SUCCEEDED, schema, response });
    });
};

export const updateAddress = (data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_ADDRESS, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_ADDRESS_SUCCEEDED, schema, response });
    });
};

export const deleteAddress = (id, schema) => (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS, schema });

  const url = `/${schema._key}/${id}`;

  return request.del(url).then(response => {
    dispatch({ type: UPDATE_ADDRESS_SUCCEEDED, id, schema });
  });
};
