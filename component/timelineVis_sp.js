import React, { Component } from "react";
import { Timeline as Vis } from "vis-timeline/standalone";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";

@connect((store) => {
  return {
    files: store.fileReducer.files,
    itemfiles: store.timelineReducer.itemfiles,
    items: store.timelineReducer.items,
    volume: store.timelineReducer.volume,
    selected_item: store.timelineReducer.selected_item,
    adding: store.timelineReducer.adding,
    added: store.timelineReducer.added,
    imgAdded: store.timelineReducer.imgAdded,
    edited: store.timelineReducer.edited,
    secEdit: store.timelineReducer.secEdit,
  };
})
export default class timeLineVisSp extends Component {
  render() {
    return (
      <>
        <ul id="title-nav">
          <li>
            <div className="d-flex align-items-center">
              <p className="sec-lbl">動画時間：</p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="seclist"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  32秒
                </button>
                <div class="dropdown-menu" aria-labelledby="seclist">
                  <p
                    class="dropdown-item jenre-item"
                    onClick={() => this.props.onSecSelect(24)}
                  >
                    24秒
                  </p>
                  <p
                    class="dropdown-item jenre-item"
                    onClick={() => this.props.onSecSelect(28)}
                  >
                    28秒
                  </p>
                  <p
                    class="dropdown-item jenre-item"
                    onClick={() => this.props.onSecSelect(32)}
                  >
                    32秒
                  </p>
                  <p
                    class="dropdown-item jenre-item"
                    onClick={() => this.props.onSecSelect(36)}
                  >
                    36秒
                  </p>
                  <p
                    class="dropdown-item jenre-item"
                    onClick={() => this.props.onSecSelect(40)}
                  >
                    40秒
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li id="vol-li">
            <p id="vol-title">音量</p>
            <div className="row vol-div">
              <input type="hidden" id="vol-change-id"></input>
              <span class="material-icons">volume_down</span>
              <Slider
                defaultValue={100}
                onChangeCommitted={this.props.onVolchenge}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
              />
              <span class="material-icons volup">volume_up</span>
            </div>
          </li>
        </ul>

        <div id="timeline"></div>
      </>
    );
  }
}
