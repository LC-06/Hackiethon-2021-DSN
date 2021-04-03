import React, { useState } from "react";

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
    e.stopPropagation();
    props.closeModal();
  }

  let modal = (
    <div className="modal">
      <div className="addTask-modal-content" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          placeholder="What's next in your agenda?"
          value={task}
          onChange={handleChangeTask}
        />
        <div className="bottom-row">
          <div className="add-task-left">
            <div>Estimated Pomodoros</div>
            <input
              type="text"
              placeholder="0"
              value={pomos}
              onChange={handleChangePomos}
            />
          </div>
          <div className="add-task-right">
            <button onClick={closeModal}>Cancel</button>
            <button
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
  );
  return props.displayModal === "add" ? modal : null;
};

export default AddTaskModal;
