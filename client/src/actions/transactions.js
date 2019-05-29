import request from "utils/request";

import { addFlashMessage } from "./ui";
import { fetchWallet } from "./wallet";

import walletSchema from "schemas/wallet";

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const FETCH_TRANSACTIONS_SUCCEEDED = "FETCH_TRANSACTIONS_SUCCEEDED";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const ADD_TRANSACTION_SUCCEEDED = "ADD_TRANSACTION_SUCCEEDED";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const UPDATE_TRANSACTION_SUCCEEDED = "UPDATE_TRANSACTION_SUCCEEDED";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const DELETE_TRANSACTION_SUCCEEDED = "DELETE_TRANSACTION_SUCCEEDED";

export const fetchTransactions = schema => (dispatch, getState) => {
  dispatch({ type: FETCH_TRANSACTIONS, schema });

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
        dispatch({ type: FETCH_TRANSACTIONS_SUCCEEDED, schema, response });
      }
    });
};

export const addTransaction = (data, schema) => (dispatch, getState) => {
  dispatch({ type: ADD_TRANSACTION, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .post(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: ADD_TRANSACTION_SUCCEEDED, schema, response });
      dispatch(fetchWallet(walletSchema));
    });
};

export const updateTransaction = (data, schema) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TRANSACTION, schema });

  const url = `/${schema._key}`;
  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  return request
    .put(url)
    .accessToken(accessToken)
    .send(data)
    .then(response => {
      dispatch({ type: UPDATE_TRANSACTION_SUCCEEDED, schema, response });
    });
};

export const deleteTransaction = schema => (dispatch, getState) => {
  dispatch({ type: DELETE_TRANSACTION, schema });

  const accessToken = getState().getIn(["auth", "access_token"]) || "";

  const url = `/${schema._key}`;

  return request
    .del(url)
    .accessToken(accessToken)
    .then(response => {
      dispatch({ type: DELETE_TRANSACTION_SUCCEEDED, schema });
    });
};
