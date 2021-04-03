import React, { Component } from "react";

class SettingsModal extends Component {
  constructor(props) {
    super(props);
  }

  closeModal(e) {
    e.stopPropagation();
    this.props.closeModal();
  }

  render() {
    let modal = (
      <div className="modal" onClick={this.closeModal}>
        <div className="settings-modal-content" onClick={ e => e.stopPropagation() }>
          <div className="modal-header">
            <h2>Settings</h2>
          </div>
          <div className="modal-body">
            <form action="index.html">
              <div className="input-title">
                <p>Work time: </p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue={this.props.workTime}
                onChange={(e) => {
                  this.props.workTime = [
                    Number(e.currentTarget.value),
                  ];
                }}
              />
              <div className="input-title">
                <p>Long Break: </p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue={this.props.longBreak}
                onChange={(e) => {
                  this.props.longBreak = [
                    Number(e.currentTarget.value),
                  ];
                }}
              />
              <div className="input-title">
                <p>Short Break: </p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue={this.props.shortBreak}
                onChange={(e) => {
                  this.props.shortBreak = [
                    Number(e.currentTarget.value),
                  ];
                }}
              />
            </form>
          </div>
          <span className="close" onClick={this.closeModal}>
            x
          </span>
        </div>
      </div>
    );
    return this.props.displayModal ? modal : null;
  }
}

export default SettingsModal;
