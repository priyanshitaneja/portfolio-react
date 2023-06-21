import React from "react";
import ProjectCard from "../../components/ProjectCard";

import "./index.scss";

const Projects = () => {
  return (
    <div className="projects-grid">
      <ProjectCard
        name="MGemi"
        description=""
        deployedUrl="https://mgemi.com/"
      />
      <ProjectCard
        name="Real Time Clock"
        description="Optimised Real time Digital Clock"
        deployedUrl="https://priyanshitaneja.github.io/realTimeClock/"
        githubUrl="https://github.com/priyanshitaneja/realTimeClock"
      />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      {/* <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} />
                <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} />
                <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} /> */}
    </div>
  );
};

export default Projects;
