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

import egg11 from "./assets/1.1.png";
import egg12 from "./assets/1.2.png";
import egg13 from "./assets/1.3.png";
import egg14 from "./assets/1.4.png";
import egg21 from "./assets/2.1.png";
import egg22 from "./assets/2.2.png";
import egg23 from "./assets/2.3.png";
import egg24 from "./assets/2.4.png";
import egg31 from "./assets/3.1.png";
import egg32 from "./assets/3.2.png";
import egg33 from "./assets/3.3.png";
import egg34 from "./assets/3.4.png";
import egg41 from "./assets/4.1.png";
import egg42 from "./assets/4.2.png";
import egg43 from "./assets/4.3.png";
import egg44 from "./assets/4.4.png";
import egg51 from "./assets/5.1.png";
import egg52 from "./assets/5.2.png";
import egg53 from "./assets/5.3.png";
import egg54 from "./assets/5.4.png";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "",
      workTime: 1,
      longBreak: 1,
      shortBreak: 1,
      remainingTime: 1,
      pomos: 0,
      mode: "work",
      isRunning: false,
      timer: null,
      tasks: [],
      completedTasks: [],
      eggs: [],
      currentEggIndex: 0,
      eggPics: [
        [egg11, egg21, egg31, egg41, egg51],
        [egg12, egg22, egg32, egg42, egg52],
        [egg13, egg23, egg33, egg43, egg53],
        [egg14, egg24, egg34, egg44, egg54],
      ],
    };
  }

  componentDidMount() {
    this.generateEggs();
  }

  generateEggs = () => {
    const nEggs = 4;
    let eggs = [];
    for (let i = 0; i < nEggs; i++) {
      eggs.push({
        id: i + 1,
        phase: 1,
        cracked: false,
      });
    }

    this.setState({ eggs: eggs });
  };

  getCurrentEggImage = () => {
    const egg = this.state.eggs[this.state.currentEggIndex];
    if (!egg) return egg11;
    return this.state.eggPics[egg.id - 1][egg.phase - 1];
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

  onChange = newValue => {
    this.setState({
      workTime: newValue * 60,
      remainingTime: newValue * 60,
    });
  };

  onLongBreakChange = newValue => {
    this.setState({
      longBreak: newValue * 60,
    });
  };

  onShortBreakChange = newValue => {
    this.setState({
      shortBreak: newValue * 60,
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
    this.setState({
      isRunning: false,
    });

    clearInterval(this.timer);

    if (this.state.mode === "work") {
      this.setState(prevState => {
        return {
          pomos: prevState.pomos + 1,
        };
      });

      let currTask = this.state.tasks.shift();
      if (currTask.completed < currTask.total) {
        currTask.completed += 1;
      }

      if (currTask.completed === currTask.total) {
        this.setState({
          completedTasks: [...this.state.completedTasks, currTask],
        });

        let currEgg = this.state.eggs[this.state.currentEggIndex];
        currEgg.phase++;

        if (currEgg.phase === 5) currEgg.cracked = true;

        this.setState({
          eggs: [currEgg, ...this.state.eggs],
        });
      } else {
        this.setState({
          tasks: [currTask, ...this.state.tasks],
        });
      }

      if (this.state.pomos > 0 && this.state.pomos % 4 === 0) {
        this.setState(prevState => {
          return {
            mode: "long",
            remainingTime: prevState.longBreak,
          };
        });
      } else {
        this.setState(prevState => {
          return {
            mode: "short",
            remainingTime: prevState.shortBreak,
          };
        });
      }
    } else {
      if (this.state.mode === "long") {
        this.setState(prevState => {
          return {
            currentEggIndex: prevState.currentEggIndex + 1,
          };
        });
        console.log(this.state.eggs[this.state.currentEggIndex]);
      }

      this.setState({
        remainingTime: this.state.workTime,
        mode: "work",
      });
    }
  };

  addTask = task => {
    if (task.name === "" || task.pomos < 1) return;

    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          name: task.name,
          completed: 0,
          total: parseInt(task.pomos),
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
    let totalPomos = this.state.tasks.reduce((prev, curr) => {
      return prev + parseInt(curr.total);
    }, 0);

    let d;
    if (totalPomos >= 4) {
      d = new Date();
      d = new Date(
        d.getTime() +
          this.state.workTime * 4 * 1000 +
          this.state.shortBreak * 3 * 1000
      );
      return this.createTimeString(d);
    } else {
      return this.finishTime();
    }
  };

  finishTime = () => {
    let d1, d2;

    if (this.state.tasks.length === 0) {
      d2 = new Date();
    } else {
      let totalPomos = this.state.tasks.reduce((prev, curr) => {
        return prev + curr.total;
      }, 0);

      let nLongBreaks = Math.trunc(totalPomos / 4);
      let nShortBreaks = totalPomos - nLongBreaks;
      let totalSeconds =
        totalPomos * this.state.workTime +
        nLongBreaks * this.state.longBreak +
        nShortBreaks * this.state.shortBreak;

      d1 = new Date();
      d2 = new Date(d1.getTime() + totalSeconds * 1000);
    }

    return this.createTimeString(d2);
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
              eggs={this.state.eggs}
              eggPics={this.state.eggPics}
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
              onChange={this.onChange}
              onLongBreakChange={this.onLongBreakChange}
              onShortBreakChange={this.onShortBreakChange}
            />
          </div>
        </div>
        <div className="body">
          <img className="eggImg" src={this.getCurrentEggImage()} alt="" />
          <div className="egg-overlay">
            <Timer
              className="timer"
              remainingTime={this.state.remainingTime}
              mode={this.state.mode}
              isRunning={this.state.isRunning}
              stopTimer={this.stopTimer}
              startTimer={this.startTimer}
            />
            <div className="info-container">
              <div className="info">Current task: {this.currentTask()}</div>
              <div className="info">
                Next long break: {this.nextLongBreak()}
              </div>
              <div className="info">Finish time: {this.finishTime()}</div>
            </div>
          </div>
          <div className="task-section">
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
      </div>
    );
  }
}

export default App;
