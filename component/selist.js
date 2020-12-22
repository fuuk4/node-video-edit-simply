import React, { Component } from "react";
import { connect } from "react-redux";
import { getSes, filterSe } from "../Actions/seAction";

@connect((store) => {
  return {
    ses: store.seReducer.ses,
    jenres: store.seReducer.jenres,
    refinementse: store.seReducer.refinementse,
    isFetching: store.seReducer.isFetching,
    success: store.seReducer.success,
  };
})
export default class Selist extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getSes("/studio/assets/sounds/"));
    this.onJenreSelect = this.onJenreSelect.bind(this);
  }

  onClickSample(url) {
    const player = document.getElementById("seplayer");
    player.src = url;
    player.play();
  }

  onJenreSelect(pk, name) {
    this.props.dispatch(filterSe(pk));
    const seJenre = document.getElementById("seMenu");
    seJenre.textContent = name;
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center p-2 bg-dark sample-div">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="seMenu"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.jenres.length > 0 &&
                this.props.jenres[0].fields.jenre}
            </button>
            <div class="dropdown-menu" aria-labelledby="seMenu">
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
              id="seplayer"
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
              {this.props.refinementse.map((se) => {
                return (
                  <tr>
                    <td className="name-w">
                      <p>{se.fields.name}</p>
                    </td>
                    <td className="btn-w">
                      <button
                        type="button"
                        className="btn btn-default list-btn"
                        onClick={() =>
                          this.props.onAddSe(
                            se.fields.name,
                            se.fields.sound_url
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
                        onClick={() => this.onClickSample(se.fields.sound_url)}
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
