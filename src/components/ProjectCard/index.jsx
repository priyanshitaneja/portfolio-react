import React from "react";

const ProjectCard = ({ src, name }) => {
  return (
    <div className="project_card">
      <img className="project_card--img" src={src} alt={name} />
      <div className="project_card--name">{name}</div>
    </div>
  );
};

export default ProjectCard;
