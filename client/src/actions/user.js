import request from "utils/request";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCEEDED = "UPDATE_USER_SUCCEEDED";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCEEDED = "DELETE_USER_SUCCEEDED";

export const updateUser = (id, data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_USER, schema });

  const url = `/${schema._key}/${id}`;

  return request
    .put(url)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_USER_SUCCEEDED, id, schema, response });
    });
};

export const deleteUser = (id, schema) => (dispatch, getState) => {
  dispatch({ type: DELETE_USER, schema });

  const url = `/${schema._key}/${id}`;

  return request.del(url).then(response => {
    dispatch({ type: UPDATE_USER_SUCCEEDED, id, schema });
  });
};
