import {
  GET_BGMS_REQUEST,
  GET_BGMS_SUCCESS,
  GET_BGMS_FAILURE,
  FILTER_BGM,
} from "../Actions/bgmAction";

const initalState = {
  isFetching: false,
  success: false,
  bgms: [],
  jenres: [],
  refinementbgm: [],
};

const bgmReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_BGMS_REQUEST:
      return { ...state, isFetching: true };
    case GET_BGMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true,
        bgms: action.payload.bgms,
        jenres: action.payload.jenres,
        refinementbgm: action.payload.bgms.filter(
          (bgm) => bgm.fields.jenre === 1
        ),
      };
    case GET_BGMS_FAILURE:
      return { ...state, isFetching: false };
    case FILTER_BGM:
      return {
        ...state,
        refinementbgm: state.bgms.filter(
          (bgm) => bgm.fields.jenre === action.payload
        ),
      };
    default:
      return state;
  }
};

export default bgmReducer;
