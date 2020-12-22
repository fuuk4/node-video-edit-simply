import axios from "axios";
export const GET_BGMS_REQUEST = "GET_BGMS_REQUEST";
export const GET_BGMS_SUCCESS = "GET_BGMS_SUCCESS";
export const GET_BGMS_FAILURE = "GET_BGMS_FAILURE";
export const FILTER_BGM = "FILTER_BGM";

//ここから　BGM取得部分
export const getBgmsRequest = () => {
  return {
    type: GET_BGMS_REQUEST,
  };
};

export const getBgmSuccess = (res) => {
  return {
    type: GET_BGMS_SUCCESS,
    payload: {
      bgms: JSON.parse(res.bgms),
      jenres: JSON.parse(res.bgm_jenres),
    },
  };
};

export const getBgmsFailure = (err) => {
  return {
    type: GET_BGMS_FAILURE,
    payload: err,
  };
};

export const getBmgs = (url) => {
  return async (dispatch) => {
    dispatch(getBgmsRequest());
    try {
      const res = await axios.get(url);
      return dispatch(getBgmSuccess(res.data));
    } catch (err) {
      return dispatch(getBgmsFailure(err));
    }
  };
};

//ここまで

//絞り込み
export const filterBgm = (jenres) => {
  return {
    type: FILTER_BGM,
    payload: jenres,
  };
};
