import firebase from 'utils/firebase'

const auth = firebase.auth()

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCEEDED = 'SIGN_IN_SUCCEEDED'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_OUT_SUCCEEDED = 'SIGN_OUT_SUCCEEDED'
export const SUBMIT_PHONE_NUMBER = 'SUBMIT_PHONE_NUMBER'

export const signup = (data, schema) => (dispatch, getState) => {
  dispatch({
    type: SIGN_UP,
    schema
  })

  dispatch({
    type: SIGN_UP_SUCCEEDED,
    schema
  })
}

export const signin = (data, schema) => (dispatch, getState) => {
  dispatch({ type: SIGN_IN, schema })

  const submit = data.submit

  if (submit === 'phone_number') {
    const phone_number = data.phone_number
    const appVerifier = window.recaptchaVerifier

    auth.signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        dispatch({ type: SUBMIT_PHONE_NUMBER })
      }).catch((error) => {
        window.alert('Error during signInWithPhoneNumber:\n\n'
            + error.code + '\n\n' + error.message);
      });
  }
  else {
    const code = data.code

    window.confirmationResult.confirm(code).then((result) => {
      var user = result.user;
      var response = user

      console.log(user)
      window.confirmationResult = null;
      dispatch({ type: SIGN_IN_SUCCEEDED, schema, response })
    }).catch((error) => {
      alert('Error while checking the verification code:\n\n'
          + error.code + '\n\n' + error.message);
    });
  }
}

export const signout = (id, data, schema) => (dispatch, getState) => {
  dispatch({
    type: SIGN_IN,
    schema
  })

  auth.signOut().then(() => {
    dispatch({
      type: SIGN_IN_SUCCEEDED,
      schema
    })
  })
}

export const checkAuth = () => (dispatch, getState) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

      console.log(user)
    }
    else {
      auth.signOut()
    }
  });
}
