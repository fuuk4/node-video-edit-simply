import axios from "axios";
export const GET_SES_REQUEST = "GET_SES_REQUEST";
export const GET_SES_SUCCESS = "GET_SES_SUCCESS";
export const GET_SES_FAILURE = "GET_SES_FAILURE";
export const FILTER_SE = "FILTER_SE";

//ここから　SE取得部分
export const getSesRequest = () => {
  return {
    type: GET_SES_REQUEST,
  };
};

export const getSeSuccess = (res) => {
  return {
    type: GET_SES_SUCCESS,
    payload: {
      ses: JSON.parse(res.sound_effects),
      jenres: JSON.parse(res.se_jenres),
    },
  };
};

export const getSesFailure = (err) => {
  return {
    type: GET_SES_FAILURE,
    payload: err,
  };
};

export const getSes = (url) => {
  return async (dispatch) => {
    dispatch(getSesRequest());
    try {
      const res = await axios.get(url);
      return dispatch(getSeSuccess(res.data));
    } catch (err) {
      return dispatch(getSesFailure(err));
    }
  };
};

//ここまで

//絞り込み
export const filterSe = (jenres) => {
  return {
    type: FILTER_SE,
    payload: jenres,
  };
};
