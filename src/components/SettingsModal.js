import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class SettingsModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      time: 25
    };
  }

  handleTimeChange = e => {
    this.setState({time: e.target.value});
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
                <p>Work time:</p>
              </div>
              <input
                type="text"
                className="input-time"
                defaultValue="0"
                onChange={this.handleTimeChange}
              />
              <div className="input-title">
                <p>Long Break:</p>
              </div>
              <div className="input-title">
                <p>Short Break:</p>
              </div>
            </form>
          </div>
          <span
            className="close"
            onClick={e => {
              this.props.onChange(this.state.workTime);
              this.props.closeModal(e);
            }}>
            <h3>submit</h3>
          </span>
          <span className="close" onClick={this.props.closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
    );
    return this.props.displayModal === "settings" ? modal : null;
  }
}
