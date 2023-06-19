import React from "react";

const Optimization = () => {
  console.log("Optimization content rerendered");
  return (
    <div className="optimization">
      <h3 className="optimisation-heading">Optimization:</h3>
      <ul className="optimisation-list">
        <li>Hours and minutes don't re-render when seconds change.</li>
        <li>
          Hours don't re-render when minutes change, seconds obviously do.
        </li>
        <li>Only seconds re-render every second.</li>
      </ul>
    </div>
  );
};

export default React.memo(Optimization);
