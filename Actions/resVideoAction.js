import axios from "axios";
export const POST_UPLOAD_INFO = "POST_UPLOAD_INFO";
export const POST_UPLOAD_SUCCESS = "POST_UPLOAD_SUCCESS";
export const POST_UPLOAD_FAILURE = "POST_UPLOAD_FAILURE";

export const postInfoReq = () => {
  return {
    type: POST_UPLOAD_INFO,
  };
};

export const postInfoSuccess = (data) => {
  return {
    type: POST_UPLOAD_SUCCESS,
    payload: data.video_url,
  };
};

export const postInfoFail = () => {
  return {
    type: POST_UPLOAD_FAILURE,
  };
};

export const postInfo = (csrf, uidb, itemfiles) => {
  return async (dispath) => {
    dispath(postInfoReq());
    console.log(itemfiles);
    axios
      .post(
        ``,
        {
          data: itemfiles,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "X-CSRFToken": csrf,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        dispath(postInfoSuccess(res.data));
      })
      .catch((err) => {
        postInfoFail();
      });
  };
};
