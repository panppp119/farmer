import request from "utils/request";

export const CREATE_ADDRESS = "CREATE_ADDRESS";
export const CREATE_ADDRESS_SUCCEEDED = "CREATE_ADDRESS_SUCCEEDED";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";
export const UPDATE_ADDRESS_SUCCEEDED = "UPDATE_ADDRESS_SUCCEEDED";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const DELETE_ADDRESS_SUCCEEDED = "DELETE_ADDRESS_SUCCEEDED";

export const createAddress = (data, schema) => (dispatch, getState) => {
  dispatch({ type: CREATE_ADDRESS, schema });

  const url = `/${schema._key}`;

  return request
    .put(url)
    .send(data)
    .then(response => {
      dispatch({ type: CREATE_ADDRESS_SUCCEEDED, schema, response });
    });
};

export const updateAddress = (id, data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_ADDRESS, schema });

  const url = `/${schema._key}/${id}`;

  return request
    .put(url)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_ADDRESS_SUCCEEDED, id, schema, response });
    });
};

export const deleteAddress = (id, schema) => (dispatch, getState) => {
  dispatch({ type: DELETE_ADDRESS, schema });

  const url = `/${schema._key}/${id}`;

  return request.del(url).then(response => {
    dispatch({ type: UPDATE_ADDRESS_SUCCEEDED, id, schema });
  });
};
