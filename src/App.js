import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faEgg,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import EggCollectionModal from "./components/EggCollectionModal";
import HelpModal from "./components/HelpModal";
import SettingsModal from "./components/SettingsModal";
import AddTaskModal from "./components/AddTaskModal";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import CompletedTaskList from "./components/CompletedTaskList";

import "./App.css";

class App extends Component {
  state = {
    show: "",
    workTime: 25 * 60,
    longBreak: 15 * 60,
    shortBreak: 5 * 60,
    remainingTime: 25 * 60,
    pomos: 0,
    mode: "work",
    isRunning: false,
    timer: null,
    tasks: [],
    completedTasks: [],
  };

  selectModal = modal => {
    this.setState({
      show: modal,
    });
  };

  closeModal = () => {
    this.setState({
      show: "",
    });
  };

  handleTimeChange = e => {
    this.setState({ workTime: e.target.value * 60 });
  };

  timeRemaining = () => {
    let remainingTime = this.state.remainingTime - 1;
    if (remainingTime === 0) {
      this.finishTimer();
      return;
    }

    this.setState({
      remainingTime: remainingTime,
    });
  };

  runTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.timeRemaining(), 1000);
  };

  startTimer = () => {
    this.runTimer();
    this.setState({
      isRunning: !this.state.isRunning,
    });
  };

  stopTimer = () => {
    clearInterval(this.timer);

    this.setState({
      isRunning: !this.state.isRunning,
    });
  };

  finishTimer = () => {
    clearInterval(this.timer);

    if (this.state.mode === "work") {
      let currTask = this.state.tasks.shift();
      currTask.completed += 1;

      if (currTask.completed === currTask.total) {
        this.setState({
          completedTasks: [...this.state.completedTasks, currTask],
        });
      } else {
        this.setState({
          tasks: [currTask, ...this.state.tasks],
        });
      }

      if (this.state.pomos > 0 && this.state.pomos % 4 === 0) {
        this.setState(prevState => {
          return {
            pomos: prevState.pomos + 1,
            mode: "long",
            remainingTime: prevState.longBreak,
          };
        });
      } else {
        this.setState(prevState => {
          return {
            pomos: prevState.pomos + 1,
            mode: "short",
            remainingTime: prevState.shortBreak,
          };
        });
      }
    } else {
      this.setState({
        remainingTime: this.state.workTime,
      });
    }
  };

  addTask = task => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          name: task.name,
          completed: 0,
          total: task.pomos,
        },
      ],
    });
  };

  clearTasks = () => {
    this.setState({
      tasks: [],
    });
  };

  currentTask = () => {
    if (this.state.tasks.length === 0) {
      return "Add a task to start collecting eggs!";
    } else {
      return this.state.tasks[0].name;
    }
  };

  createTimeString = d => {
    let h = (d.getHours() < 10 ? "0" : "") + d.getHours();
    let m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    return `${h}:${m}`;
  };

  nextLongBreak = () => {
    let totalPomos = this.state.tasks.reduce((total, curr) => {
      return total + parseInt(curr.total);
    }, 0);

    console.log(totalPomos);

    let d;
    if (totalPomos >= 4) {
      d = new Date();
      d = new Date(
        d.getTime() + this.state.workTime * 4 + this.state.shortBreak * 3
      );
      return this.createTimeString(d);
    } else {
      return this.finishTime();
    }
  };

  finishTime = () => {
    let d;

    if (this.state.tasks.length === 0) {
      d = new Date();
    } else {
      let totalPomos = this.state.tasks.reduce((total, curr) => {
        return total + parseInt(curr.total);
      }, 0);

      let nLongBreaks = Math.trunc(totalPomos / 4);
      let nShortBreaks = totalPomos - nLongBreaks;
      let totalSeconds =
        totalPomos * this.state.workTime +
        nLongBreaks * this.state.longBreak +
        nShortBreaks * this.state.shortBreak;

      d = new Date();
      d = new Date(d.getTime() + totalSeconds);
    }

    return this.createTimeString(d);
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="left">
            <div className="heading">Eggodoro</div>
            <div className="subheading">
              {" "}
              Break open your egg as you complete your tasks! {"\n"} Being
              productive has never been more fun.
            </div>
          </div>
          <div className="right">
            <button
              className="toolbar-button"
              onClick={() => this.selectModal("egg")}
            >
              <FontAwesomeIcon icon={faEgg} size="3x" />
            </button>
            <EggCollectionModal
              displayModal={this.state.show}
              closeModal={this.closeModal}
            />
            <button
              className="toolbar-button"
              onClick={() => this.selectModal("help")}
            >
              <FontAwesomeIcon icon={faQuestionCircle} size="3x" />
            </button>
            <HelpModal
              displayModal={this.state.show}
              closeModal={this.closeModal}
            />
            <button
              className="toolbar-button"
              onClick={() => this.selectModal("settings")}
            >
              <FontAwesomeIcon icon={faCog} size="3x" />
            </button>
            <SettingsModal
              displayModal={this.state.show}
              closeModal={this.closeModal}
              handleTime={this.handleTimeChange}
            />
          </div>
        </div>
        <div className="body">
          <Timer
            remainingTime={this.state.remainingTime}
            mode={this.state.mode}
            isRunning={this.state.isRunning}
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
          />
          <div className="info-container">
            <div className="info">Current task: {this.currentTask()}</div>
            <div className="info">Next long break: {this.nextLongBreak()}</div>
            <div className="info">Finish time: {this.finishTime()}</div>
          </div>
          <AddTaskModal
            displayModal={this.state.show}
            closeModal={this.closeModal}
            addTask={this.addTask}
          />
          <TaskList
            tasks={this.state.tasks}
            selectModal={() => this.selectModal("add")}
            closeModal={this.closeModal}
            clearTasks={this.clearTasks}
          />
          <CompletedTaskList tasks={this.state.completedTasks} />
        </div>
      </div>
    );
  }
}

export default App;
