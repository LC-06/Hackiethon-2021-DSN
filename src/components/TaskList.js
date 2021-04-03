import React, { Component } from "react";

import "./TaskList.css";

class TaskList extends Component {
  render() {
    return this.props.tasks.map(task => {
      return (
        <div className="task">
          <div>{task.name}</div>
          <div>
            {task.completed}/{task.total}
          </div>
        </div>
      );
    });
  }
}

export default TaskList;
