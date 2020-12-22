import {
  GET_SES_REQUEST,
  GET_SES_SUCCESS,
  GET_SES_FAILURE,
  FILTER_SE,
} from "../Actions/seAction";

const initalState = {
  isFetching: false,
  success: false,
  ses: [],
  jenres: [],
  refinementse: [],
};

const seReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_SES_REQUEST:
      return { ...state, isFetching: true };
    case GET_SES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        ses: action.payload.ses,
        jenres: action.payload.jenres,
        refinementse: action.payload.ses.filter((se) => se.fields.jenre === 1),
      };
    case GET_SES_FAILURE:
      return { ...state, isFetching: false };
    case FILTER_SE:
      return {
        ...state,
        refinementse: state.ses.filter(
          (se) => se.fields.jenre === action.payload
        ),
      };
    default:
      return state;
  }
};

export default seReducer;
