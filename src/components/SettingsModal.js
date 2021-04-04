import React, { Component } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./SettingsModal.css";
export default class SettingsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workTime: 25,
      longBreak: 15,
      shortBreak: 5,
    };
  }

  handleWorkTimeChange = e => {
    let value = e.target.value;
    if (value <= 0) {
      e.target.setCustomValidity("Time cannot be less than 1!");
    } else {
      e.target.setCustomValidity("");
      this.setState({ workTime: e.target.value });
    }
  };

  handleLongBreakChange = e => {
    let value = e.target.value;
    if (value <= 0) {
      e.target.setCustomValidity("Time cannot be less than 1!");
    } else {
      e.target.setCustomValidity("");
      this.setState({ longBreak: e.target.value });
    }
  };

  handleShortBreakChange = e => {
    let value = e.target.value;
    if (value <= 0) {
      e.target.setCustomValidity("Time cannot be less than 1!");
    } else {
      e.target.setCustomValidity("");
      this.setState({ shortBreak: e.target.value });
    }
  };

  render() {
    let modal = (
      <div className="modal" onClick={this.props.closeModal}>
        <div
          className="modal-content settings-bg"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-title">Settings</div>
            <div className="close" onClick={this.props.closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="modal-body settings-body">
            <form action="index.html">
              <div className="input-title">Work Time:</div>
              <input
                type="number"
                id="number-input"
                className="input-time"
                defaultValue={this.state.workTime}
                onChange={this.handleWorkTimeChange}
              />
              <span className="minutes">minutes</span>
              <div className="input-title">Long Break:</div>
              <input
                type="number"
                id="number-input"
                className="input-time"
                defaultValue={this.state.longBreak}
                onChange={this.handleLongBreakChange}
              />
              <span className="minutes">minutes</span>
              <div className="input-title">Short Break:</div>
              <input
                type="number"
                id="number-input"
                className="input-time"
                defaultValue={this.state.shortBreak}
                onChange={this.handleShortBreakChange}
              />
              <span className="minutes">minutes</span>
            </form>
          </div>
          <div className="settings-button-container">
            <button
              className="settings-submit"
              onClick={e => {
                this.props.onChange(this.state.workTime);
                this.props.onLongBreakChange(this.state.longBreak);
                this.props.onShortBreakChange(this.state.shortBreak);
                this.props.closeModal(e);
              }}
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    );
    return this.props.displayModal === "settings" ? modal : null;
  }
}
