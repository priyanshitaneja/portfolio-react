import React from "react";

const Seconds = ({ sec }) => {
  console.log("sec rendered");
  return <h1 className="time"> {sec} </h1>;
};

export default React.memo(Seconds);
