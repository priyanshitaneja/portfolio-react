import React from "react";
import Clock from "./Clock";
import Optimization from "./Optimization";

import "./index.css";

const RealTimeClock = () => {
  console.log("RealTimeClock rendered");

  return (
    <div className="container">
      <Clock />
      <Optimization />
    </div>
  );
};

export default RealTimeClock;
