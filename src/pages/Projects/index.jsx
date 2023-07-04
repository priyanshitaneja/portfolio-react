import React from "react";
import ProjectCard from "../../components/ProjectCard";

import "./index.scss";

const Projects = () => {
  return (
    <div className="projects-grid">
      <ProjectCard
        name="MGemi"
        imageUrl="https://i.imgur.com/I0CGwKO.jpg"
        description={<>Optimised the website of MGemi<br/><br/></>}
        deployedUrl="https://mgemi.com/"
      />
      <ProjectCard
        name="Beeya Wellness"
        description="Optimised website for a women wellness Brand"
        imageUrl="https://i.imgur.com/aJG9ETY.jpg"
        deployedUrl="https://beeyawellness.com/"
        githubUrl=""
      />
      <ProjectCard
        name="Oriserve"
        description="Developed the website of Oriserve (Wordpress)"
        imageUrl="https://i.imgur.com/3mbLuai.png"
        deployedUrl="https://www.oriserve.com/"
      />
      <ProjectCard
        name="Aventon"
        description={<>Pixel Perfected the Aventon website<br/><br/></>}
        imageUrl="https://i.imgur.com/EBdMxB5.png"
        deployedUrl="https://www.aventon.com/"
        githubUrl=""
      />
      <ProjectCard
        name="React Dashboard"
        description="React Dashboard with Google OAuth Login"
        imageUrl="https://i.imgur.com/jeOdxcT.png"
        deployedUrl="https://react-db-black.vercel.app/"
        githubUrl={"https://github.com/priyanshitaneja/react-db"}
      />
      <ProjectCard
        name="Generator-AI"
        description="A blog writer that writes content on a topic based on tags and tone provided"
        imageUrl="https://i.imgur.com/TOARWBF.png"
        deployedUrl="https://generator-ai-smoky.vercel.app/"
        githubUrl="https://github.com/priyanshitaneja/Generator-AI"
      />
      <ProjectCard
        name="Glyde Rides"
        description={<>Website for Glyde Rides Pvt Ltd<br/><br/></>}
        imageUrl="https://i.imgur.com/F13ILYK.png"
        deployedUrl="https://glyderides.com/"
        githubUrl=""
      />
      <ProjectCard
        name="Real Time Clock"
        description={<>Optimised Real time Digital Clock<br/><br/></>}
        imageUrl="https://i.imgur.com/P4nNPRc.png"
        deployedUrl="https://priyanshitaneja.github.io/realTimeClock/"
        githubUrl="https://github.com/priyanshitaneja/realTimeClock"
      />
      <ProjectCard
        name="Blurry Loading"
        description={<>A blurry loading webpage<br/><br/></>}
        imageUrl="https://i.imgur.com/zOzfczB.png"
        deployedUrl="https://priyanshitaneja.github.io/Blurry-Loading/"
        githubUrl="https://github.com/priyanshitaneja/Blurry-Loading"
      />
      <ProjectCard
        name="Javascript Carousel"
        description={<>A minimal JavaScript Carousel<br/><br/></>}
        imageUrl="https://i.imgur.com/j7uxqhV.png"
        deployedUrl="https://priyanshitaneja.github.io/js-carousel/"
        githubUrl="https://github.com/priyanshitaneja/js-carousel"
      />
      <ProjectCard
        name="React Carousel"
        description={<>A minimal React Carousel<br/><br/></>}
        imageUrl="https://i.imgur.com/WVHISn0.png"
        deployedUrl="https://golden-bienenstitch-8c4c8e.netlify.app/"
        githubUrl="https://github.com/priyanshitaneja/react-carousel"
      />
      <ProjectCard
        name="Compensation Projection"
        description="Graphical representation of compensation on yearly basis"
        imageUrl="https://i.imgur.com/hAUN1Nk.png"
        deployedUrl="https://compensation-projection.netlify.app/"
        githubUrl="https://github.com/priyanshitaneja/compensation-projection"
      />
      <ProjectCard
        name="Keeper"
        description={<>Clone of Google Keep web app<br/><br/></>}
        imageUrl="https://i.imgur.com/aXNMlMf.png"
        deployedUrl="https://j96po7.csb.app/"
        githubUrl="https://github.com/priyanshitaneja/keeper"
      />
      <ProjectCard
        name="To-Do List"
        description={<>To-Do List<br/><br/></>}
        imageUrl="https://i.imgur.com/IuOdymq.png"
        deployedUrl="https://7upub7.csb.app/"
        githubUrl="https://github.com/priyanshitaneja/todoList"
      />
      <ProjectCard
        name="Simon Game"
        description={<>Simon- A Memory Game<br/><br/></>}
        imageUrl="https://i.imgur.com/w5PsY2N.png"
        deployedUrl="https://priyanshitaneja.github.io/SimonGame/"
        githubUrl="https://github.com/priyanshitaneja/SimonGame"
      />
      {/* <ProjectCard
        name=""
        description=""
        imageUrl=""
        deployedUrl=""
        githubUrl=""
      /> */}
    </div>
  );
};

export default Projects;
