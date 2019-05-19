import request from "utils/request";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCEEDED = "UPDATE_USER_SUCCEEDED";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCEEDED = "DELETE_USER_SUCCEEDED";

export const fetchUser = (schema) => (dispatch, getState) => {
  dispatch({ type: FETCH_USER, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(['auth', 'user', 'access_token']) || ''

  return request
    .get(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: FETCH_USER_SUCCEEDED, schema, response });
    });
};

export const updateUser = (data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_USER, schema });

  const url = `/${schema._key}/update`;
  const accessToken = getState().getIn(['auth', 'user', 'access_token']) || ''

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_USER_SUCCEEDED, schema, response });
    });
};

export const deleteUser = (schema) => (dispatch, getState) => {
  dispatch({ type: DELETE_USER, schema });

  const accessToken = getState().getIn(['auth', 'user', 'access_token']) || ''

  const url = `/${schema._key}/delete`;

  return request.del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_USER_SUCCEEDED, schema });
    });
};
