import React, { Component } from "react";

import EggCollectionModal from "./components/EggCollectionModal";
import HelpModal from "./components/HelpModal";
import SettingsModal from "./components/SettingsModal";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";

import "./App.css";

class App extends Component {
  state = {
    show: false,
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

  selectModal = () => {
    this.setState({
      show: !this.state.show,
    });
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
      return total + curr;
    });

    let d;
    if (totalPomos >= 4) {
      d = new Date();
      d = new Date(
        d.getTime() + this.state.workTime * 4 + this.state.shortBreak * 3
      );
      return this.createTimeString(d);
    } else {
      return this.endTime();
    }
  };

  endTime = () => {
    let d;

    if (this.state.tasks.length === 0) {
      d = new Date();
    } else {
      let totalPomos = this.state.tasks.reduce((total, curr) => {
        return total + curr.pomos;
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

  clearTasks = () => {
    this.setState({
      tasks: [],
    });
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
            <button onClick={() => this.selectModal()}>
              <i class="fas fa-egg" />
              <p>egg icon</p>
            </button>
            <EggCollectionModal
              displayModal={this.state.show}
              closeModal={this.selectModal}
            />
            <button type="button">
              <p>question icon</p>
            </button>
            <HelpModal
              displayModal={this.state.show}
              closeModal={this.selectModal}
            />
            <button onClick={() => this.selectModal()}>
              <p>setting icon</p>
            </button>
            <SettingsModal
              displayModal={this.state.show}
              closeModal={this.selectModal}
              workTime={this.workTime}
              longBreak={this.longBrak}
              shortBreak={this.shortBreak}
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
          <div className="info">
            <div>Current task: {this.currentTask()}</div>
            <div>Next long break: {this.nextLongBreak()}</div>
            <div>Finish time: {this.endTime()}</div>
          </div>
          <div className="tasks">
            <div className="taskHeading">
              <div>Tasks</div>
              <button onClick="">plus button</button>
            </div>
            <TaskList tasks={this.state.tasks} />
            <button onClick={this.clearTasks}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
