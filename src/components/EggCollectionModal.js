import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEgg, faSmile, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./EggCollectionModal.css";

const EggCollectionModal = props => {
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  const eggs = props.eggs.map(egg => {
    return (
      <div className="egg">
        {egg === false ? (
          <FontAwesomeIcon icon={faEgg} size={"6x"} />
        ) : (
          <FontAwesomeIcon icon={faSmile} size={"6x"} />
        )}
      </div>
    );
  });

  let modal = (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal-content collection-bg"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">Your Coll-egg-tion</div>
          <div className="modal-header-right">
            <div className="modal-title">0 of 6</div>
            <div className="close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </div>
        <div className="modal-body collection-body">{eggs}</div>
      </div>
    </div>
  );
  return props.displayModal === "egg" ? modal : null;
};

export default EggCollectionModal;
