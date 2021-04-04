import React, { useState } from "react";

import "./AddTaskModal.css";

const AddTaskModal = props => {
  const [task, setTask] = useState("");
  const [pomos, setPomos] = useState(0);

  const handleChangeTask = e => {
    setTask(e.target.value);
  };

  const handleChangePomos = e => {
    setPomos(e.target.value);
  };

  function closeModal(e) {
    setTask("");
    setPomos(0);
    e.stopPropagation();
    props.closeModal();
  }

  let modal = (
    <div className="modal">
      <div className="modal-content add-bg" onClick={e => e.stopPropagation()}>
        <input
          className="add-name-input"
          type="text"
          placeholder="What's next in your agenda?"
          value={task}
          onChange={handleChangeTask}
          size="30"
        />
        <div className="middle-row">
          <div className="add-pomos">Estimated Pomodoros</div>
          <div className="bottom-row">
            <div className="add-task-left">
              <input
                size="3"
                maxLength="3"
                className="add-pomos-input"
                type="number"
                placeholder="0"
                value={pomos > 0 ? pomos : ""}
                onChange={handleChangePomos}
              />
            </div>
            <div className="add-task-right">
              <button className="add-task-button" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="add-task-button"
                onClick={e => {
                  props.addTask({
                    name: task,
                    pomos: pomos,
                  });
                  closeModal(e);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return props.displayModal === "add" ? modal : null;
};

export default AddTaskModal;
