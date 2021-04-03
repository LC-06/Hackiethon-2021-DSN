import React, { Component } from "react";

import "./TaskList.css";

class CompletedTaskList extends Component {
  render() {
    let result = this.props.tasks.map(task => {
      return (
        <div className="completed-task">
          <div className="task-text">{task.name}</div>
        </div>
      );
    });

    if (result.length > 0) {
      return (
        <div>
          <div className="task-heading">Completed Tasks</div>
          <hr className="divider" />
          <div>{result}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="task-heading">Completed Tasks</div>
          <hr className="divider" />
          <div className="no-task-message">
            Add a task to start collecting eggs!
          </div>
        </div>
      );
    }
  }
}

export default CompletedTaskList;
