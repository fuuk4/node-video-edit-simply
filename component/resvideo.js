import React, { Component } from "react";
import { connect } from "react-redux";

@connect((store) => {
  return {
    isLoading: store.resVideoReducer.isLoading,
    success: store.resVideoReducer.success,
    error: store.resVideoReducer.error,
    resurl: store.resVideoReducer.resurl,
  };
})
export default class ResVideo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.success) {
      $("#post_edit_btn").removeClass("btn-secondary");
      $("#post_edit_btn").addClass("btn-primary");
    } else {
      $("#post_edit_btn").removeClass("btn-primary");
      $("#post_edit_btn").addClass("btn-secondary");
    }
  }

  render() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return (
        <div id="prev-tabs">
          {(this.props.isLoading || this.props.error) && (
            <div class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          {this.props.success && (
            <video
              class="px-1"
              id="video-player"
              src={this.props.resurl}
              controls
              controlslist="nodownload"
              disablePictureInPicture
            ></video>
          )}
        </div>
      );
    } else {
      return (
        <div className="prev-tab-div">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                href="#prev-tabs"
                className="nav-link nav-link-tab active"
                data-toggle="tab"
              >
                プレビュー
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="prev-tabs" className="tab-pane active">
              {(this.props.isLoading || this.props.error) && (
                <div class="lds-facebook">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
              {this.props.success && (
                <video
                  class="px-1"
                  id="video-player"
                  src={this.props.resurl}
                  controls
                  controlslist="nodownload"
                  disablePictureInPicture
                ></video>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
