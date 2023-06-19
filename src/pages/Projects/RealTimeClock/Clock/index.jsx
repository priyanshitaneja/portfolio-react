import React, { useState } from "react";
import Hour from "./Hours";
import Minute from "./Minutes";
import Seconds from "./Seconds";

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
    <div className="clock">
      <Hour hours={hours} />
      <h1 className="colon">:</h1>
      <Minute min={min} />
      <h1 className="colon">:</h1>
      <Seconds sec={sec} />
    </div>
  );
};

export default React.memo(Clock);