import type { Metadata } from 'next';
import ProjectCard from "@/components/ProjectCard";
import "./page.scss";

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected frontend projects: AI tools, e-commerce builds and interface ' +
    'experiments in React, TypeScript and JavaScript.',
  alternates: { canonical: '/projects' },
};

const Projects = () => {
  return (
    <>
      {/*
        axe's `page-has-heading-one` was failing here — the grid was the entire
        page and the only headings were the <h3> card titles. .sr-only rather
        than visible: the rule needs the heading in the accessibility tree, not
        on screen, and a visible title would also force the fixed-height grid
        below to subtract its height.
      */}
      <h1 className="sr-only">Projects</h1>
      {/*
        `eager` on the top row only. The grid is a fixed-height scroll
        container, so the remaining cards are off screen and <Image>
        lazy-loads them; the LCP candidate is up here and must not be
        deferred. Three because that is the column count at the desktop
        widths Lighthouse measures.
      */}
      <div className="projects-grid">
        <ProjectCard
          eager
          name="PDF to EPUB"
          description="Converts a PDF to a Kindle-ready EPUB in the browser — cover intact, nothing uploaded"
          imageUrl="/images/pdf-to-epub.png"
          deployedUrl="https://pdf-to-epub-blue.vercel.app/"
          githubUrl="https://github.com/priyanshitaneja/pdf-to-epub"
        />
        <ProjectCard
          eager
          name="Story Pointer"
          description="Planning poker on the Jira issue — a Forge app replacing a paid Marketplace add-on"
          imageUrl="/images/story-pointer.png"
          githubUrl="https://github.com/priyanshitaneja/jira-story-point-planner"
        />
        <ProjectCard
          eager
          name="AI Micro Therapist"
          description="AI-powered mood tracker & personal mental health companion with daily insights"
          imageUrl="/images/ai-micro-therapist.png"
          deployedUrl="https://ai-micro-therapist.vercel.app/"
          githubUrl="https://github.com/priyanshitaneja/ai-micro-therapist"
        />
        <ProjectCard
          name="AI Color Analysis"
          description="AI-powered seasonal color palette analyzer — upload a photo to discover your best colors"
          imageUrl="/images/ai-color-analysis.png"
          deployedUrl="https://ai-color-analysis.vercel.app"
          githubUrl="https://github.com/priyanshitaneja/ai-color-analysis"
        />
        <ProjectCard
          name="Pure Pilates"
          description="A Pilates studio website with class booking, virtual sessions & pre/post-natal programs"
          imageUrl="/images/pure-pilates.png"
          deployedUrl="https://pure-pilates.vercel.app"
          githubUrl="https://github.com/priyanshitaneja/pure-pilates"
        />
        <ProjectCard
          name="MGemi"
          imageUrl="https://i.imgur.com/I0CGwKO.jpg"
          description="Ground-up rebuild of the storefront — Lighthouse performance 56 to 77"
          deployedUrl="https://mgemi.com/"
        />
        <ProjectCard
          name="Beeya Wellness"
          description="Built solo for a women's wellness brand — WCAG-compliant, pixel-perfect"
          imageUrl="https://i.imgur.com/aJG9ETY.jpg"
          deployedUrl="https://beeyawellness.com/"
          githubUrl=""
        />
        <ProjectCard
          name="Oriserve"
          description="Company site built and shipped end to end, from build to deploy"
          imageUrl="https://i.imgur.com/3mbLuai.png"
          deployedUrl="https://www.oriserve.com/"
        />
        <ProjectCard
          name="Aventon"
          description="Pixel-perfect build of the Aventon storefront, matched to design spec"
          imageUrl="https://i.imgur.com/EBdMxB5.png"
          deployedUrl="https://www.aventon.com/"
          githubUrl=""
        />
        <ProjectCard
          name="Generator-AI"
          description="Blog-post generator — give it a topic, tags and tone, it drafts the piece"
          imageUrl="https://i.imgur.com/TOARWBF.png"
          deployedUrl="https://generator-ai-smoky.vercel.app/"
          githubUrl="https://github.com/priyanshitaneja/Generator-AI"
        />
        <ProjectCard
          name="Compensation Projection"
          description="Projects 4-year total comp — toggle base, equity and bonuses to compare offers"
          imageUrl="https://i.imgur.com/hAUN1Nk.png"
          deployedUrl="https://compensation-projection.netlify.app/"
          githubUrl="https://github.com/priyanshitaneja/compensation-projection"
        />
        {/* <ProjectCard
          name=""
          description=""
          imageUrl=""
          deployedUrl=""
          githubUrl=""
        /> */}
      </div>
    </>
  );
};

export default Projects;
