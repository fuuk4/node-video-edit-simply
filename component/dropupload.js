import React, { Component } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { connect } from "react-redux";
import {
  addFile,
  addPreFile,
  addurl,
  deleteFile,
  editIndex,
} from "../Actions/fileAction";
import {
  addImgs,
  addItem,
  deleteItem,
  updated,
  updateStart,
} from "../Actions/timelineAction";
import Bgmlist from "./bgmlist";
import Selist from "./selist";
import { convertDate, playTime } from "../utils/timeToDate";
import sha1 from "sha1";
import { postInfo } from "../Actions/resVideoAction";
import DropdownSp from "./dropupload_sp";

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
export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.getUploadParams = this.getUploadParams.bind(this);
    this.getNextpubid = this.getNextpubid.bind(this);
    this.getNextindex = this.getNextindex.bind(this);

    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.delfile = this.delfile.bind(this);

    this.getAudiotime = this.getAudiotime.bind(this);

    this.addTimelineBgm = this.addTimelineBgm.bind(this);
    this.addTimelineSe = this.addTimelineSe.bind(this);

    this.uploadBackend = this.uploadBackend.bind(this);

    this.onComaChange = this.onComaChange.bind(this);
  }

  getUploadParams({ file, meta }) {
    this.props.dispatch(
      addPreFile({
        id: setid,
        name: meta.name,
        index: this.getNextindex(),
        filetype: meta.type,
        url: "",
      })
    );

    return {
      url: url,
      body: fd,
      headers: xhr,
    };
  }

  handleChangeStatus({ meta, xhr, remove }, status) {
    if (status === "done") {
      let pubid = JSON.parse(xhr.response).public_id;
      pubid = parseInt(
        pubid.split("/")[3].split(document.getElementById("uidb").value)[1]
      );
      this.props.dispatch(addurl(pubid, JSON.parse(xhr.response).secure_url));
      this.props.dispatch(addFile(pubid));
      remove();
    }
  }

  getNextpubid() {
    const defalut = [1, 2, 3, 4];
    const now = this.props.prefiles.map((file) => file.id);

    const ans = defalut.filter((i) => now.indexOf(i) == -1);
    return ans[0];
  }

  getNextindex() {
    const defalut = [1, 2, 3, 4];
    const now = this.props.prefiles.map((file) => file.index);
    const ans = defalut.filter((i) => now.indexOf(i) == -1);
    return ans[0];
  }

  componentDidUpdate() {
    if (this.props.files.length > 3 && !this.props.imgAdded) {
      const defalut = [1, 2, 3, 4];

      const sec = parseInt($("#seclist").text().split("秒")[0]) / 4;
      let start;
      let end;

      this.props.files.map((file, index) => {
        if (
          this.props.itemfiles.findIndex(
            (itemfile) => itemfile.id === $("#uidb").val() + file.id
          ) === -1
        ) {
          switch (file.index) {
            case 1:
              start = convertDate("00:00:00");
              end = convertDate("00:00:" + sec);
              break;
            case 2:
              start = convertDate("00:00:" + sec);
              end = convertDate("00:00:" + sec * 2);
              break;
            case 3:
              start = convertDate("00:00:" + sec * 2);
              end = convertDate("00:00:" + sec * 3);
              break;
            case 4:
              start = convertDate("00:00:" + sec * 3);
              end = convertDate("00:00:" + sec * 4);
              break;
          }
          const contentItem = `<img src='${file.prevurl}' style='width: 48px; height: 48px;'></img>${file.name}`;
          const post = {
            id: $("#uidb").val() + file.id,
            filetype: "img",
            start: start,
            end: end,
            volume: 100,
            url: file.prevurl,
            index: file.index,
          };

          const lineitem = {
            id: $("#uidb").val() + file.id,
            content: contentItem,
            start: start,
            end: end,
            editable: false,
            group: 1,
          };

          this.props.dispatch(addImgs(post, lineitem));
        }
      });
    }
  }

  delfile(id) {
    this.props.dispatch(deleteFile(id));
    this.props.dispatch(deleteItem($("#uidb").val() + id));
  }

  addTimelineBgm(filename, url) {
    const contentItem =
      "<div class='audio-asset' style='width: 48px; height: 48px;'>" +
      String(filename) +
      "</div>";
    const sec = parseInt($("#seclist").text().split("秒")[0]);
    const findGrope = this.props.items.filter((item) => {
      return item.group === 2;
    });
    if (findGrope.length < 2) {
      this.props.dispatch(
        addItem(
          "bgm" + 1,
          contentItem,
          convertDate("00:00:00"),
          convertDate("00:00:" + sec),
          2,
          url,
          "bgm"
        )
      );
    }
  }

  getAudiotime(filename, url) {
    const audioCtx = new AudioContext();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    xhr.onload = () => {
      audioCtx.decodeAudioData(xhr.response).then((s) => {
        this.addTimelineSe(filename, url, playTime(s.duration));
      });
    };
  }

  addTimelineSe(filename, url, playtime) {
    console.log();
    const contentItem =
      "<div class='audio-asset' style='width: 48px; height: 48px;'>" +
      String(filename) +
      "</div>";
    const findGrope = this.props.items.filter((item) => {
      return item.group === 3;
    });
    if (!findGrope.length > 0) {
      this.props.dispatch(
        addItem(
          "se" + 1,
          contentItem,
          convertDate("00:00:00"),
          playtime,
          3,
          url,
          "se"
        )
      );
    } else {
      this.props.dispatch(
        addItem(
          "se" +
            (parseInt(findGrope[findGrope.length - 1].id.split("se")[1]) + 1),
          contentItem,
          convertDate("00:00:00"),
          playtime,
          3,
          url,
          "se"
        )
      );
    }
  }

  onComaChange(nextItemfile, nowItemfile) {
    const nextItem = this.props.items.find(
      (item) => item.id === nextItemfile.id
    );
    const nextFile = this.props.files.find(
      (file) => file.index === nextItemfile.index
    );
    const nowItem = this.props.items.find((item) => item.id === nowItemfile.id);
    const nowFile = this.props.files.find(
      (file) => file.index === nowItemfile.index
    );

    this.props.dispatch(
      updateStart(
        nextItem.id,
        nextItem.content,
        nowItem.start,
        nowItem.end,
        nextItemfile.volume,
        nextItem.group,
        nextItemfile.url,
        nextItemfile.filetype,
        nowItem.editable,
        nowItemfile.index
      )
    );

    this.props.dispatch(
      updateStart(
        nowItem.id,
        nowItem.content,
        nextItem.start,
        nextItem.end,
        nowItemfile.volume,
        nowItem.group,
        nowItemfile.url,
        nowItemfile.filetype,
        nowItem.editable,
        nextItemfile.index
      )
    );

    this.props.dispatch(
      editIndex({
        id: nextFile.id,
        name: nextFile.name,
        index: nowFile.index,
        filetype: nextFile.filetype,
        prevurl: nextFile.prevurl,
      })
    );

    this.props.dispatch(
      editIndex({
        id: nowFile.id,
        name: nowFile.name,
        index: nextFile.index,
        filetype: nowFile.filetype,
        prevurl: nowFile.prevurl,
      })
    );

    this.props.dispatch(updated());
  }

  uploadBackend() {
    const uidb = document.getElementById("uidb").value;
    const csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    this.props.dispatch(postInfo(csrf, uidb, this.props.itemfiles));
  }

  render() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return (
        <DropdownSp
          ongetparam={this.getUploadParams}
          onchangeStatus={this.handleChangeStatus}
          onAddBgm={this.addTimelineBgm}
          onAddSe={this.getAudiotime}
          onDelClick={this.delfile}
          onChangeComa={this.onComaChange}
        />
      );
    } else {
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
                href="#library"
                className="nav-link nav-link-tab active"
                data-toggle="tab"
              >
                画像
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#bgm"
                className="nav-link nav-link-tab"
                data-toggle="tab"
              >
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
            <div id="library" className="tab-pane active">
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
                                            this.onComaChange(itemfile, now)
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
                            onClick={() => this.delfile(file.id)}
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
                  getUploadParams={this.getUploadParams}
                  onChangeStatus={this.handleChangeStatus}
                  accept="image/*"
                  maxFiles={4}
                  multiple={true}
                  inputContent={(files, extra) =>
                    extra.reject
                      ? "動画や音楽、写真のみ選択可能です"
                      : "クリックまたはドラッグ"
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
              <Bgmlist onAddBgm={this.addTimelineBgm} />
            </div>
            <div id="soundeffect" className="tab-pane">
              <Selist onAddSe={this.getAudiotime} />
            </div>
          </div>
        </div>
      );
    }
  }
}
