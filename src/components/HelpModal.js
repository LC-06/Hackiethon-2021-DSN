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
          <h2>What is a Pomodoro?</h2>
          <p>
            Pomodoro is a proven effective technique that involves completing tasks in 25 minute segments and short breaks in between. Once four tasks are completed, your current egg will crack open, added to your coll-egg-tion and a new egg will appear. You are able to change the number of pomodoros for each task. By default, a pomodoro is 25 minutes but can be changed in the settings.
          </p>
          <h2>Where are my eggs?</h2>
          <p>
            Click on the egg icon next to settings to access your coll-egg-tion!  
          </p>
          <h2>Long breaks and short breaks?</h2>
          <p>
            A short break is awarded after completing one pomodoro. A long break is awarded to you after you have completed four pomodoros. By default, short breaks will last for 5 minutes and long breaks will last for 15 minutes. Your break time can be changed in the settings.
          </p>
          <h2>How do I track my tasks?</h2>
          <p>
            All the completed tasks will be underneath your tasklist.
          </p>
        </div>
      </div>
    </div>
  );
  return props.displayModal === "help" ? modal : null;
};

export default HelpModal;
