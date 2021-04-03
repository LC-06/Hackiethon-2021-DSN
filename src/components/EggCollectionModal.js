import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./EggCollectionModal.css";

const EggCollectionModal = props => {
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  let modal = (
    <div className="modal" onClick={closeModal}>
      <div
        className="collection-modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Your Coll-egg-tion</h2>
        </div>
        <div className="modal-body">
          <p>*the body*</p>
        </div>
        <span className="close" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
    </div>
  );
  return props.displayModal === "egg" ? modal : null;
};

export default EggCollectionModal;
