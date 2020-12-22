import React, { Component } from "react";
import { Timeline as Vis } from "vis-timeline/standalone";
import { connect } from "react-redux";
import {
  deleteItem,
  fetchAll,
  secUpdated,
  secUpdateStart,
  updated,
  updateStart,
} from "../Actions/timelineAction";
import Slider from "@material-ui/core/Slider";
import { convertDate } from "../utils/timeToDate";
import { postInfo } from "../Actions/resVideoAction";
import TimeLineVisSp from "./timelineVis_sp";

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
    deleted: store.timelineReducer.deleted,
  };
})
export default class timeLineVis extends Component {
  constructor(props) {
    super(props);
    this.timeline = null;

    this.onclicksec = this.onclicksec.bind(this);

    this.onMove = this.onMove.bind(this);
    this.onMoving = this.onMoving.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.uploadBackend = this.uploadBackend.bind(this);
    this.volumechange = this.volumechange.bind(this);
  }

  componentDidMount() {
    const container = document.getElementById("timeline");
    const options = {
      orientation: "top",
      min: new Date(1970, 0, 1, 0, 0, 0, 0, 0),
      max: new Date(1970, 0, 1, 0, 0, 32, 0),
      tooltipOnItemUpdateTime: true,
      showCurrentTime: false,
      multiselect: false,
      multiselectPerGroup: true,
      stack: false,
      zoomMin: 30000,
      zoomMax: 5000000,
      editable: {
        updateTime: true,
        remove: true,
      },
      onMove: this.onMove,
      onMoving: this.onMoving,
      onRemove: this.onRemove,
      format: {
        minorLabels: {
          millisecond: "SSS [ms]",
          second: "s [s]",
          minute: "HH:mm:ss",
          hour: "HH:mm:ss",
          weekday: "HH:mm:ss",
          day: "HH:mm:ss",
          week: "HH:mm:ss",
          month: "HH:mm:ss",
          year: "HH:mm:ss",
        },
        majorLabels: {
          millisecond: "HH:mm:ss",
          second: "HH:mm:ss",
          minute: "",
          hour: "",
          weekday: "",
          day: "",
          week: "",
          month: "",
          year: "",
        },
      },
    };

    const isMobile = navigator.userAgent.match(/iPhone|Android.+Mobile/);
    if (isMobile) {
      options.zoomMin = 10000;
      options.zoomMax = 32000;
    }

    this.timeline = new Vis(container, [], [], options);
    // this.timeline.addCustomTime(new Date(1970, 0, 1, 0, 0, 0, 0), "linebar");
    // this.timeline.setCustomTimeTitle("00:00:00,000", "linebar");

    this.timeline.on("select", this.onSelect);
    this.timeline.on("timechange", this.onMoveLinebar);

    const defaultGroup = [
      {
        id: 1,
        content:
          "<span class='material-icons'>movie_creation</span><p>動画</p>",
      },
      {
        id: 2,
        content: "<span class='material-icons'>music_note</span><p>BGM</p>",
      },
      {
        id: 3,
        content: "<span class='material-icons'>graphic_eq</span><p>効果音</p>",
      },
    ];

    this.timeline.setData({
      items: this.props.items,
      groups: defaultGroup,
    });
  }

  componentDidUpdate() {
    this.props.dispatch(fetchAll());

    let cItems = this.props.items;

    this.timeline.setData({
      items: cItems,
    });

    const img_len = this.props.itemfiles.filter((e) => e.filetype === "img")
      .length;
    const bgm_len = this.props.itemfiles.filter((e) => e.filetype === "bgm")
      .length;
    const se_len = this.props.itemfiles.filter((e) => e.filetype === "se")
      .length;
    if (
      (this.props.imgAdded || this.props.added) &&
      img_len > 3 &&
      (bgm_len > -1 || se_len > -1)
    ) {
      this.uploadBackend();
    } else if (this.props.edited && img_len > 3) {
      this.uploadBackend();
    } else if (this.props.secEdit && img_len > 3) {
      this.uploadBackend();
    } else if (this.props.deleted && img_len > 3) {
      this.uploadBackend();
    }

    if (this.props.added === true) {
      if (!navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        this.timeline.fit();
      } else {
        this.timeline.setWindow(
          convertDate("00:00:00"),
          convertDate("00:00:10")
        );
      }
    }
  }

  uploadBackend() {
    const uidb = document.getElementById("uidb").value;
    const csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    this.props.dispatch(postInfo(csrf, uidb, this.props.itemfiles));
  }

  onclicksec(sec) {
    const changedate = new Date(1970, 0, 1, 0, 0, sec, 0);
    const options = {
      max: changedate,
    };

    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      if (sec < 29) {
        options.zoomMin = 10000;
        options.zoomMax = 29000;
      } else if (sec < 33) {
        options.zoomMin = 10000;
        options.zoomMax = 33000;
      } else if (sec < 37) {
        options.zoomMin = 10000;
        options.zoomMax = 37000;
      } else {
        options.zoomMin = 10000;
        options.zoomMax = 40000;
      }
    } else {
      if (sec < 29) {
        options.zoomMin = 20000;
        options.zoomMax = 29000;
      } else if (sec < 33) {
        options.zoomMin = 30000;
        options.zoomMax = 33000;
      } else if (sec < 37) {
        options.zoomMin = 33000;
        options.zoomMax = 37000;
      } else {
        options.zoomMin = 35000;
        options.zoomMax = 40000;
      }
    }

    $("#seclist").text(sec + "秒");
    this.timeline.setOptions(options);

    const bgm = this.props.items.find(
      (item) => item.group === 2 && item.id !== "bgm_back"
    );
    const img = this.props.items.filter(
      (item) => item.group === 1 && item.id !== "img_back"
    );
    const ses = this.props.items.filter(
      (item) =>
        item.end > changedate &&
        item.id !== "bgm_back" &&
        item.id !== "img_back" &&
        item.group === 3
    );

    if (bgm !== undefined) {
      const bgmfile = this.props.itemfiles.find(
        (itemfile) => itemfile.id === bgm.id
      );
      this.props.dispatch(
        updateStart(
          bgm.id,
          bgm.content,
          bgm.start,
          changedate,
          bgmfile.volume,
          bgm.group,
          bgmfile.url,
          bgmfile.filetype,
          bgm.editable,
          bgmfile.index
        )
      );
    }
    if (img !== undefined) {
      img.map((imgitem) => {
        const imgfiles = this.props.itemfiles.find(
          (itemfile) => itemfile.id === imgitem.id
        );
        let start;
        let end;
        switch (imgfiles.index) {
          case 1:
            start = convertDate("00:00:00");
            end = convertDate("00:00:" + sec / 4);
            break;
          case 2:
            start = convertDate("00:00:" + sec / 4);
            end = convertDate("00:00:" + (sec / 4) * 2);
            break;
          case 3:
            start = convertDate("00:00:" + (sec / 4) * 2);
            end = convertDate("00:00:" + (sec / 4) * 3);
            break;
          case 4:
            start = convertDate("00:00:" + (sec / 4) * 3);
            end = convertDate("00:00:" + (sec / 4) * 4);
            break;
        }

        this.props.dispatch(
          secUpdateStart(
            imgitem.id,
            imgitem.content,
            start,
            end,
            imgfiles.volume,
            imgitem.group,
            imgfiles.url,
            imgfiles.filetype,
            imgitem.editable,
            imgfiles.index
          )
        );
      });
    }

    if (ses !== undefined) {
      ses.map((se) => {
        const seitem = this.props.itemfiles.find(
          (itemfile) => itemfile.id === se.id
        );
        const diff = se.end.getTime() - se.start.getTime();
        const startchange = new Date(1970, 0, 1, 0, 0, sec, 0);
        startchange.setMilliseconds(startchange.getMilliseconds() - diff);

        this.props.dispatch(
          updateStart(
            seitem.id,
            se.content,
            startchange,
            changedate,
            seitem.volume,
            se.group,
            seitem.url,
            seitem.filetype,
            se.editable,
            seitem.index
          )
        );
      });
    }
    this.props.dispatch(secUpdated());
    this.timeline.fit();
  }

  render() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return (
        <TimeLineVisSp
          onSecSelect={this.onclicksec}
          onVolchenge={this.volumechange}
        />
      );
    } else {
      return (
        <>
          <ul id="title-nav">
            <li>
              <h3>タイムライン</h3>
            </li>
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
                      onClick={() => this.onclicksec(24)}
                    >
                      24秒
                    </p>
                    <p
                      class="dropdown-item jenre-item"
                      onClick={() => this.onclicksec(28)}
                    >
                      28秒
                    </p>
                    <p
                      class="dropdown-item jenre-item"
                      onClick={() => this.onclicksec(32)}
                    >
                      32秒
                    </p>
                    <p
                      class="dropdown-item jenre-item"
                      onClick={() => this.onclicksec(36)}
                    >
                      36秒
                    </p>
                    <p
                      class="dropdown-item jenre-item"
                      onClick={() => this.onclicksec(40)}
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
                  onChangeCommitted={this.volumechange}
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

  onMoving(item, callback) {
    if (item.start.getFullYear() < 1970) callback(null);
    else {
      callback(item);
    }
  }
  onMove(item, callback) {
    //ここでサーバーに命令を出す。
    //onMovingはstoreを書き換えるのが主、移動し終わるとonMoveが呼ばれるようになっている。
    const url = this.props.itemfiles.find(
      (itemfile) => itemfile.id === item.id
    );
    this.props.dispatch(
      updateStart(
        item.id,
        item.content,
        item.start,
        item.end,
        url.volume,
        item.group,
        url.url,
        url.filetype,
        item.editable,
        url.index
      )
    );
    this.props.dispatch(updated());
  }

  onRemove(info) {
    this.props.dispatch(deleteItem(info.id));
    $("#vol-li").hide();
  }

  onSelect(info) {
    if (info.items.length > 0) {
      const select_item = this.props.items.find(
        (item) => item.id === info.items[0]
      );

      if (select_item.group > 1) {
        $("#vol-change-id").val(select_item.id);

        //こいつでvolumeを設定する予定。muislider-rootの下にあるinput:hiddenにvalueがあるのでこれに設定すれば行けそう。
        const select_itemfiles = this.props.itemfiles.find(
          (itemfile) => itemfile.id === select_item.id
        );

        $(".MuiSlider-root").find("input").val(select_itemfiles.volume);
        $(".MuiSlider-track").css("width", select_itemfiles.volume + "%");
        $(".MuiSlider-thumb").prop("aria-valuenow", select_itemfiles.volume);
        $(".MuiSlider-thumb").css("left", select_itemfiles.volume + "%");
        $(".jss5").text(select_itemfiles.volume);

        let selectName = select_item.content.split("<");
        selectName = selectName[1].split(">");
        if ($(".audio-asset").length) {
          $(".audio-asset")
            .parent()
            .parent()
            .parent()
            .find(".vis-drag-left")
            .css("display", "none");

          $(".audio-asset")
            .parent()
            .parent()
            .parent()
            .find(".vis-drag-right")
            .css("display", "none");

          $("#vol-title").text(selectName[1] + "の音量");
          $("#vol-li").show();
        }
      } else {
        $("#vol-li").hide();
      }
    } else {
      $("#vol-li").hide();
    }
  }

  onMoveLinebar(info) {
    if (info.time.getFullYear() < 1970) {
      info.time = new Date(1970, 0, 1, 0, 0, 0, 0);
    }
  }

  volumechange(event, newV) {
    const changeid = $("#vol-change-id").val();
    const url = this.props.itemfiles.find(
      (itemfile) => itemfile.id === changeid
    );
    const select_item = this.props.items.find((item) => item.id === changeid);
    this.props.dispatch(
      updateStart(
        select_item.id,
        select_item.content,
        select_item.start,
        select_item.end,
        newV,
        select_item.group,
        url.url,
        url.filetype,
        select_item.editable,
        url.index
      )
    );
    this.props.dispatch(updated());
  }
}
