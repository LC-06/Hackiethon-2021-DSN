import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEgg, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./EggCollectionModal.css";

const EggCollectionModal = props => {
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  const eggs = props.eggs.map((egg, index) => {
    console.log(index);
    return (
      <div className="egg" key={egg.id}>
        {egg.cracked === false ? (
          <FontAwesomeIcon icon={faEgg} size={"6x"} />
        ) : (
          <img
            className="eggIMG"
            src={props.eggPics[index][0]}
            alt=""
          />
        )}
      </div>
    );
  });

  let cracked = props.eggs.reduce((prev, curr) => {
    return prev + (curr.cracked ? 1 : 0);
  }, 0);

  let modal = (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal-content collection-bg"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">Your Coll-egg-tion</div>
          <div className="modal-header-right">
            <div className="modal-title">
              {cracked} of {props.eggs.length}
            </div>
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
