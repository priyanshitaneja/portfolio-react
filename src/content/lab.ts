import type { LabEntry } from './types';

/*
 * Lab, not Projects.
 *
 * The grid this replaces mixed weekend builds with paid client work — MGemi,
 * Beeya, Aventon and the Oriserve site — which flattened production work with
 * real conversion numbers into hobby work sitting next to an AI toy. Those
 * four moved into the /work timeline where they belong, which also means
 * nothing on the site hot-links images from imgur any more.
 *
 * The organising unit here is a question, not a feature list. `finding` is
 * what the experiment settled, and it is the field that decides whether an
 * entry earns its place: an experiment with no finding is just a demo.
 */
export const LAB: readonly LabEntry[] = [
  {
    slug: 'pdf-to-epub',
    name: 'PDF to EPUB',
    question:
      'How much of a document pipeline can run with nothing ever leaving the browser?',
    what: 'Converts a PDF into a Kindle-ready EPUB entirely client side. Cover art survives. Nothing uploads.',
    year: 2026,
    status: 'live',
    liveUrl: 'https://pdf-to-epub-blue.vercel.app/',
    sourceUrl: 'https://github.com/priyanshitaneja/pdf-to-epub',
  },
  {
    slug: 'story-pointer',
    name: 'Story Pointer',
    question: 'Does a paid Jira Marketplace add-on justify its price?',
    what: 'Planning poker that lives on the Jira issue itself, built as a Forge app.',
    year: 2026,
    status: 'source only',
    sourceUrl: 'https://github.com/priyanshitaneja/story-pointer',
  },
  {
    slug: 'ai-micro-therapist',
    name: 'AI Micro Therapist',
    question:
      'How should a model behave when the stakes are personal and it is wrong?',
    what: 'A mood tracker whose daily insights are generated from what you logged.',
    year: 2025,
    status: 'live',
    liveUrl: 'https://ai-micro-therapist.vercel.app/',
    sourceUrl: 'https://github.com/priyanshitaneja/ai-micro-therapist',
  },
  {
    slug: 'ai-color-analysis',
    name: 'AI Color Analysis',
    question:
      'Can a vision model do the job people pay a colour consultant for?',
    what: 'Upload a photo, get a seasonal palette back, computed in the browser with MediaPipe FaceMesh.',
    year: 2025,
    status: 'live',
    liveUrl: 'https://ai-color-analysis.vercel.app/',
    sourceUrl: 'https://github.com/priyanshitaneja/ai-color-analysis',
  },
  {
    slug: 'compensation-projection',
    name: 'Compensation Projection',
    question: 'What is an offer actually worth over four years?',
    what: 'Toggle base, equity and bonus to compare two offers across a vesting schedule.',
    year: 2024,
    status: 'live',
    liveUrl: 'https://compensation-projection.netlify.app/',
    sourceUrl: 'https://github.com/priyanshitaneja/compensation-projection',
  },
];

/*
 * Held back pending a decision, rather than deleted:
 *
 *   Pure Pilates   A studio site with booking. No experiment thesis, so it
 *                  reads as freelance filler directly beneath an AI
 *                  infrastructure case study. If it was paid client work it
 *                  belongs in /work instead, not here and not cut.
 *   Generator-AI   "Give it a topic and a tone, it drafts a blog post" is the
 *                  most generic LLM demo there is, and it subtracts
 *                  credibility next to production RAG. Worth keeping only if
 *                  it predates the Novo AI work and can be framed as what led
 *                  there, which is a better story and a different entry.
 */
