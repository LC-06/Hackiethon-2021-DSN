import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./TaskList.css";

class TaskList extends Component {
  render() {
    let result = this.props.tasks.map(task => {
      return (
        <div className="task" key={task.name}>
          <div className="task-text">{task.name}</div>
          <div className="task-text">
            {task.completed}/{task.total}
          </div>
        </div>
      );
    });

    if (result.length > 0) {
      return (
        <div>
          <div className="task-heading-container">
            <div className="task-heading">Tasks</div>
            <button className="plus-button" onClick={this.props.selectModal}>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>
          <hr className="divider" />
          <div>{result}</div>
          <div className="clear-container">
            <button className="clear-button" onClick={this.props.clearTasks}>
              Clear
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="task-heading-container">
            <div className="task-heading">Tasks</div>
            <button className="plus-button" onClick={this.props.selectModal}>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>
          <hr className="divider" />
          <div className="no-task-message">
            Add a task to start collecting eggs!
          </div>
        </div>
      );
    }
  }
}

export default TaskList;
