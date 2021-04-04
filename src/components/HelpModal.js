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
        <div className="help-body">
          <div className="help-heading">What is the Pomodoro Technique?</div>
          <div className="help-para">
            The Pomodoro Technique is a proven, effective time-management tool
            that involves completing tasks in 25 minute segments with short
            breaks in between. A 'Pomodoro' is traditionally a 25-minute block
            but the length of a Pomodoro can be changed in the settings. The
            time to complete each task is measured in Pomodoros.
          </div>
          <div className="help-heading">Long breaks and short breaks</div>
          <div className="help-para">
            A short break is awarded after completing one Pomodoro. A long break
            is awarded to you after you have completed four Pomodoros. By
            default, short breaks will last for 5 minutes and long breaks will
            last for 15 minutes. Your break time can be changed in the settings.
          </div>
          <div className="help-heading">How do I get eggs?</div>
          <div className="help-para">
            Every completed task will cause your current egg to crack. Once four
            tasks are completed, your current egg will fully crack open and be
            added to your coll-egg-tion. The next egg will then appear.
          </div>
          <div className="help-heading">Where are my eggs?</div>
          <div className="help-para">
            Click on the egg icon next to settings to access your coll-egg-tion!
          </div>
        </div>
      </div>
    </div>
  );
  return props.displayModal === "help" ? modal : null;
};

export default HelpModal;
