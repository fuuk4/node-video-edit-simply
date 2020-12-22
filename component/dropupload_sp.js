import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone-uploader";
import Bgmlist from "./bgmlist";
import Selist from "./selist";
import ResVideo from "./resvideo";

@connect((store) => {
  return {
    prefiles: store.fileReducer.prefiles,
    files: store.fileReducer.files,
    itemfiles: store.timelineReducer.itemfiles,
    items: store.timelineReducer.items,
    groups: store.timelineReducer.groups,
    imgAdded: store.timelineReducer.imgAdded,
  };
})
export default class DropdownSp extends Component {
  render() {
    const sortFiles = this.props.files.map((e) => {
      return e;
    });
    sortFiles.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              href="#prev-video"
              className="nav-link nav-link-tab active"
              data-toggle="tab"
            >
              プレビュー
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#library"
              className="nav-link nav-link-tab"
              data-toggle="tab"
            >
              画像
            </a>
          </li>
          <li className="nav-item">
            <a href="#bgm" className="nav-link nav-link-tab" data-toggle="tab">
              BGM
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#soundeffect"
              className="nav-link nav-link-tab"
              data-toggle="tab"
            >
              効果音
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="prev-video" className="tab-pane preview">
            <div id="res-video">
              <ResVideo></ResVideo>
            </div>
          </div>
          <div id="library" className="tab-pane">
            <table className="table sp-table">
              <tbody>
                {sortFiles.map((file) => {
                  const now = this.props.itemfiles.find(
                    (e) => e.index === file.index
                  );
                  return (
                    <tr>
                      <td className="img-col">
                        <img
                          src={file.prevurl}
                          className="img-thumbnail"
                          width="100px"
                        ></img>
                      </td>
                      <td className="file-name">
                        <span className="file-name-box">{file.name}</span>
                      </td>
                      <td className="coma-tab">
                        {this.props.files.length > 3 && (
                          <div className="d-flex align-content-center">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="comalist"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {file.index}コマ目
                              </button>
                              <div
                                class="dropdown-menu"
                                aria-labelledby="comalist"
                              >
                                {this.props.itemfiles.map((itemfile) => {
                                  if (
                                    itemfile.index !== file.index &&
                                    itemfile.filetype === "img"
                                  ) {
                                    return (
                                      <p
                                        class="dropdown-item jenre-item"
                                        onClick={() =>
                                          this.props.onChangeComa(itemfile, now)
                                        }
                                      >
                                        {itemfile.index}コマ目
                                      </p>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="delete-file">
                        <button
                          type="button"
                          className="btn btn-default del-img-btn"
                          onClick={() => this.props.onDelClick(file.id)}
                        >
                          <i className="material-icons">clear</i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {this.props.files.length < 4 && (
              <Dropzone
                getUploadParams={this.props.ongetparam}
                onChangeStatus={this.props.onchangeStatus}
                accept="image/*"
                maxFiles={4}
                multiple={true}
                inputContent={(files, extra) =>
                  extra.reject ? "動画や音楽、写真のみ選択可能です" : "タップ"
                }
                styles={{
                  dropzoneReject: {
                    borderColor: "red",
                    backgroundColor: "#DAA",
                  },
                  inputLabel: (files, extra) =>
                    extra.reject ? { color: "red" } : {},
                }}
              />
            )}
          </div>
          <div id="bgm" className="tab-pane">
            <Bgmlist onAddBgm={this.props.onAddBgm} />
          </div>
          <div id="soundeffect" className="tab-pane">
            <Selist onAddSe={this.props.onAddSe} />
          </div>
        </div>
      </div>
    );
  }
}
