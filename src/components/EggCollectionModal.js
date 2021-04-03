import React from "react";
import './EggCollectionModal';

const EggCollectionModal = props => {
  
  function closeModal (e) {
    e.stopPropagation()
    props.closeModal()
  }
  
  let modal = (
    <div className="modal" onClick={ closeModal }>
      <div className="modal-content" onClick={ e => e.stopPropagation() }>
        <div className="modal-header">
          <h2>Your Coll-egg-tion</h2>
        </div>
        <div className="modal-body">
          <p>*the body*</p>
        </div>
        <span className="close" onClick={ closeModal }>
          x
        </span>
      </div>
    </div>
  )
  return ( props.displayModal ? modal : null );
}

export default EggCollectionModal;
