import {
  POST_UPLOAD_INFO,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
} from "../Actions/resVideoAction";

const initalState = {
  isLoading: false,
  success: false,
  error: false,
  resurl: "",
};

const resVideoReducer = (state = initalState, action) => {
  switch (action.type) {
    case POST_UPLOAD_INFO:
      return { ...state, isLoading: true, success: false, error: false };
    case POST_UPLOAD_SUCCESS:
      return {
        ...state,
        resurl: action.payload,
        isLoading: false,
        success: true,
      };
    case POST_UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default resVideoReducer;
