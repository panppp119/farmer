export const ADD_FLASH_MESSAGE = "ADD_FLASH_MESSAGE";
export const REMOVE_FLASH_MESSAGE = "REMOVE_FLASH_MESSAGE";

export const addFlashMessage = (message) => (dispatch, getState) => {
  dispatch({
    type: ADD_FLASH_MESSAGE,
    message
  });

  setTimeout(() => {
    dispatch(removeFlashMessage());
  }, 5000)
};

export const removeFlashMessage = () => (dispatch, getState) => {
  dispatch({ type: REMOVE_FLASH_MESSAGE });
};
