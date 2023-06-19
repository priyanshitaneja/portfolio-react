import React, { useState } from "react";
import Hour from "./Hours";
import Minute from "./Minutes";
import Seconds from "./Seconds";

import "./index.css";

const Clock = () => {
  let [time, setTime] = useState(new Date());
  let [hours, setHours] = useState(time.getHours());
  let [min, setMin] = useState(time.getMinutes());
  let [sec, setSec] = useState(time.getSeconds());

  console.log("clock rendered");

  const handleCurrentTime = () => {
    setTime((time = new Date()));

    if (hours !== time.getHours()) {
      setHours(time.getHours());
    }

    if (min !== time.getMinutes()) {
      setMin(time.getMinutes());
    }

    if (sec !== time.getSeconds()) {
      setSec(time.getSeconds());
    }
  };

  setInterval(handleCurrentTime, 1000);

  return (
    <div className="container">
      <div className="clock">
        <Hour hours={hours} />
        <h1 className="colon">:</h1>
        <Minute min={min} />
        <h1 className="colon">:</h1>
        <Seconds sec={sec} />
      </div>
      <div className="optimization">
        <h3 className="optimisation-heading">Optimization:</h3>
        <ul className="optimisation-list">
            <li>Hours and minutes don't re-render when seconds change.</li>
            <li>Hours don't re-render when minutes change, seconds obviously do.</li>
            <li>Only seconds re-render every second.</li>
        </ul>
      </div>
    </div>
  );
};

export default Clock;
