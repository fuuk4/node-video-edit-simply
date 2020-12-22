import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import timelineReducer from "./timelineReducer";
import bgmReducer from "./bgmReducer";
import seReducer from "./seReducer";
import resVideoReducer from "./resVideoReducer";

export default combineReducers({
  fileReducer,
  timelineReducer,
  bgmReducer,
  seReducer,
  resVideoReducer,
});
