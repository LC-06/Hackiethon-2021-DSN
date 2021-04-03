import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class SettingsModal extends Component {
  constructor(props) {
    super(props);
  }

  // closeModal(e) {
  //   e.stopPropagation();
  //   this.props.closeModal();
  // }

  onFieldChange = event => {
    // const fieldName = event.target.name;
    // const fieldValue = event.target.value;
    // this.props.handleTime(fieldName, fieldValue);
    this.props.handleTime(event);
  };

  render() {
    let modal = (
      <div className="modal" onClick={this.props.closeModal}>
        <div
          className="settings-modal-content"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Settings</h2>
          </div>
          <div className="modal-body">
            <form action="index.html">
              <div className="input-title">
                <p>Work time (:</p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue="0"
                id="workTime"
                onChange={this.onFieldChange}
              />
              <div className="input-title">
                <p>Long Break: </p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue="0"
                id="longBreak"
                onChange={this.onFieldChange}
              />
              <div className="input-title">
                <p>Short Break: </p>
              </div>
              <input
                type="number"
                className="input-time"
                defaultValue="0"
                id="shortBreak"
                onChange={this.onFieldChange}
              />
            </form>
          </div>
          <span className="close" onClick={this.props.closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
    );
    return this.props.displayModal === "settings" ? modal : null;
  }
}
