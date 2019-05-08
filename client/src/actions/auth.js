import firebase from "utils/firebase";
import { push } from "react-router-redux";

const auth = firebase.auth();

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCEEDED = "SIGN_IN_SUCCEEDED";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCEEDED = "SIGN_OUT_SUCCEEDED";
export const SUBMIT_PHONE_NUMBER = "SUBMIT_PHONE_NUMBER";
export const CANCEL_VERIFICATION = "CANCEL_VERIFICATION";

export const signin = (data, schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_IN, schema });

  const submit = data.submit;

  if (submit === "phone_number") {
    const phone_number = data.phone_number;
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        dispatch({ type: SUBMIT_PHONE_NUMBER });
      })
      .catch(error => {
        alert(
          "Error during signInWithPhoneNumber:\n\n" +
            error.code +
            "\n\n" +
            error.message
        );
      });
  } else {
    const code = data.code;

    window.confirmationResult
      .confirm(code)
      .then(result => {
        var user = result.user;
        var response = {
          uid: user.uid,
          phone_number: user.phone_number
        };

        localStorage.setItem("token", user.uid);

        window.confirmationResult = null;
        dispatch({ type: SIGN_IN_SUCCEEDED, schema, response });
        dispatch(push("/"));
      })
      .catch(error => {
        alert(
          "Error while checking the verification code:\n\n" +
            error.code +
            "\n\n" +
            error.message
        );
      });
  }
};

export const signout = () => (dispatch, getState) => {
  auth.signOut();
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT_SUCCEEDED });
};

export const checkAuth = schema => (dispatch, getState) => {
  auth.onAuthStateChanged(user => {
    var token = localStorage.getItem("token");

    if (token !== null && token === user.uid) {
      var uid = user.uid;
      var phone_number = user.phoneNumber;
      // var provider_data = user.providerData;
      const response = {
        uid,
        phone_number
      };

      dispatch({ type: SIGN_IN_SUCCEEDED, schema, response });
    } else {
      auth.signOut();
    }
  });
};

export const cancelVerification = () => (dispatch, getState) => {
  window.confirmationResult = null;
  dispatch({ type: CANCEL_VERIFICATION });
};
