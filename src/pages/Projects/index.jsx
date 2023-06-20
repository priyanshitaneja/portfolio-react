import React from "react";
import ProjectCard from "../../components/ProjectCard";

const Projects = () => {
    return (
        <div>
            <h1>Projects</h1>
            <div className="projects-grid">
                <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} />
                <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} />
                <ProjectCard src={"https://picsum.photos/300/300/?blur"} name={"Real Time Clock"} />
            </div>
        </div>
    )
}

export default Projects;