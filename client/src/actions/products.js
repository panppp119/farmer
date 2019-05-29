import request from "utils/request";

import { addFlashMessage } from "./ui";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_SUCCEEDED = "FETCH_PRODUCTS_SUCCEEDED";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const ADD_PRODUCT_SUCCEEDED = "ADD_PRODUCT_SUCCEEDED";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_PRODUCT_SUCCEEDED = "UPDATE_PRODUCT_SUCCEEDED";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_SUCCEEDED = "DELETE_PRODUCT_SUCCEEDED";

export const fetchProducts = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_PRODUCTS, schema });

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
        dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, schema, response });
      }
    });
};

export const addProduct = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_PRODUCT, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: ADD_PRODUCT_SUCCEEDED, schema, response });
    });
};

export const updateProduct = (id, data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_PRODUCT, schema });

  const url = `/${schema._key}/${id}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_PRODUCT_SUCCEEDED, schema, response });
    });
};

export const deleteProduct = schema => (dispatch, getState) => {
  dispatch({ type: DELETE_PRODUCT, schema });

  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  const url = `/${schema._key}`;

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_PRODUCT_SUCCEEDED, schema });
    });
};
