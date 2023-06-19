import React from "react";

const Seconds = ({ sec }) => {
  console.log("sec rendered");
  return <h1 className="time"> {sec.toString().padStart(2, '0')} </h1>;
};

export default React.memo(Seconds);
