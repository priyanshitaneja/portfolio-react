import React from "react";

const Minute = ({ min }) => {
  console.log("min rendered");
  return <h1 className="time"> {min.toString().padStart(2, '0')} </h1>;
};

export default React.memo(Minute);
