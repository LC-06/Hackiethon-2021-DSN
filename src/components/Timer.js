import React, { Component } from "react";

import "./Timer.css";

class Timer extends Component {
  getMessage = phase => {
    if (phase === "work") {
      return "Time to work!";
    } else if (phase === "short") {
      return "Time for a short break!";
    } else {
      return "Time for a well-earned long break!";
    }
  };

  formatTime = time => {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = "0" + minutes;

    let seconds = time - 60 * minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  };

  render() {
    const {
      remainingTime,
      mode,
      isRunning,
      stopTimer,
      startTimer,
    } = this.props;

    return (
      <div className="timer">
        <div className="time">{this.formatTime(remainingTime)}</div>
        <div className="message">{this.getMessage(mode)}</div>
        <div>
          {isRunning ? (
            <button className="startButton" onClick={() => stopTimer()}>
              STOP
            </button>
          ) : (
            <button className="startButton" onClick={() => startTimer()}>
              START
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Timer;
