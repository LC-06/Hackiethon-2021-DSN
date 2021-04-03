import React, { Component } from "react";

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.workTime,
      itemList: ["0", "1", "2", "3", "4", "5"],
    };
  }

  closeModal(e) {
    e.stopPropagation();
    this.props.closeModal();
  }

  onPickerSelect(index) {
    this.setState({
      selectedItem: index,
    });
  }

  render() {
    let modal = (
      <div className="settingsModal" onClick={this.closeModal}>
        <div className="modal-header">
          <h2>Settings</h2>
        </div>
        <div className="modal-body">
          
        </div>
        <span className="close" onClick={this.closeModal}>
          x
        </span>
      </div>
    );
    return this.props.displayModal ? modal : null;
  }
}

export default SettingsModal;
