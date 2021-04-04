import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./HelpModal.css";

const HelpModal = props => {
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  let modal = (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content help-bg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Help</div>
          <div className="close" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <div className="modal-body">
          <p>*tbd*</p>
        </div>
      </div>
    </div>
  );
  return props.displayModal === "help" ? modal : null;
};

export default HelpModal;
