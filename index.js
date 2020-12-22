import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import ResVideo from "./component/resvideo";
import Dropdown from "./component/dropupload";
import Timeline from "./component/timelineVis";

const dropuploader = document.getElementById("dropup");
const dragcomp = document.getElementById("time-line");
const resvideo = document.getElementById("res-video");

ReactDOM.render(
  <Provider store={store}>
    <Dropdown />
  </Provider>,
  dropuploader
);
if (resvideo !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <ResVideo />
    </Provider>,
    resvideo
  );
}
ReactDOM.render(
  <Provider store={store}>
    <Timeline />
  </Provider>,
  dragcomp
);
