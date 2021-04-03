import React from "react";

const HelpModal = props => {
  
  function closeModal (e) {
    e.stopPropagation()
    props.closeModal()
  }

  let modal = (
    <div className="modal" onClick={ closeModal }>
      <div className="help-modal-content" onClick={ e => e.stopPropagation() }>
        <div className="modal-header">
          <h2>Help</h2>
        </div>
        <div className="modal-body">
          <p>*tbd*</p>
        </div>
        <span className="close" onClick={ closeModal }>
          x
        </span>
      </div>
    </div>
  )
  return ( props.displayModal ? modal : null );
}

export default HelpModal;
