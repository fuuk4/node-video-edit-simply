import React, { Component } from "react";
import { connect } from "react-redux";
import { getBmgs, filterBgm } from "../Actions/bgmAction";

@connect((store) => {
  return {
    bgms: store.bgmReducer.bgms,
    jenres: store.bgmReducer.jenres,
    refinementbgm: store.bgmReducer.refinementbgm,
    isFetching: store.bgmReducer.isFetching,
    success: store.bgmReducer.success,
  };
})
export default class Bgmlist extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getBmgs("/studio/assets/sounds/"));
    this.onJenreSelect = this.onJenreSelect.bind(this);
  }

  onClickSample(url) {
    const player = document.getElementById("bgmplayer");
    player.src = url;
    player.play();
  }

  onJenreSelect(pk, name) {
    this.props.dispatch(filterBgm(pk));
    const bgmJenre = document.getElementById("bgmMenu");
    bgmJenre.textContent = name;
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center p-2 bg-dark sample-div">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="bgmMenu"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.jenres.length > 0 &&
                this.props.jenres[0].fields.jenre}
            </button>
            <div class="dropdown-menu" aria-labelledby="bgmMenu">
              {this.props.jenres.map((jenre) => {
                return (
                  <p
                    className="dropdown-item jenre-item"
                    onClick={() =>
                      this.onJenreSelect(jenre.pk, jenre.fields.jenre)
                    }
                  >
                    {jenre.fields.jenre}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <audio
              id="bgmplayer"
              className="try-audio"
              src=""
              controls
              controlslist="nodownload"
            ></audio>
          </div>
        </div>
        <div>
          <table className="table sp-table">
            <tbody>
              {this.props.refinementbgm.map((bgm) => {
                return (
                  <tr>
                    <td className="name-w">
                      <p>{bgm.fields.name}</p>
                    </td>
                    <td className="btn-w">
                      <button
                        type="button"
                        className="btn btn-default list-btn"
                        onClick={() =>
                          this.props.onAddBgm(
                            bgm.fields.name,
                            bgm.fields.sound_url
                          )
                        }
                      >
                        <span className="material-icons">add_circle</span>
                      </button>
                    </td>
                    <td className="btn-w">
                      <button
                        type="button"
                        className="btn btn-default list-btn"
                        onClick={() => this.onClickSample(bgm.fields.sound_url)}
                      >
                        <span className="material-icons">
                          play_circle_outline
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
