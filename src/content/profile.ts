import type { Certification, Education, SocialLink } from './types';

export const SITE_URL = 'https://www.priyanshitaneja.com';

/*
 * Novo is a fintech, not a bank. It is a business banking *platform* whose
 * deposit accounts are held at a partner bank, so calling it a bank on a
 * public page is a compliance problem rather than a wording preference.
 * "Fintech" is the word to use everywhere on this site.
 */
export const PROFILE = {
  name: 'Priyanshi Taneja',
  jobTitle: 'Software Development Engineer II',

  /* The homepage h2 and the first line of the Person JSON-LD description. */
  positioning:
    'I build the AI surface of a fintech, and the guidelines the rest of engineering builds by.',

  intro: [
    'React and TypeScript since 2020, the last three years at Novo, a US fintech for small businesses.',
    'I shipped the retrieval-backed chatbot that 27,000+ businesses meet during onboarding, and the console the team uses to configure the agents behind it. I also wrote the Claude Code engineering guidelines and the PR-draft and release skills that Novo builds with.',
  ],

  email: 'tanejapriyanshi1997@gmail.com',
  resumeUrl: '/priyanshi-taneja-resume.pdf',

  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn profile',
      url: 'https://www.linkedin.com/in/priyanshitaneja/',
    },
    {
      id: 'github',
      label: 'GitHub profile',
      url: 'https://github.com/priyanshitaneja',
    },
    {
      id: 'email',
      label: 'Email Priyanshi',
      url: 'mailto:tanejapriyanshi1997@gmail.com',
    },
  ] satisfies readonly SocialLink[],

  /*
   * Feeds Person.knowsAbout in JSON-LD. Not the same list as the visible
   * footer strip: this one is read by machines and can afford to be longer.
   */
  knowsAbout: [
    'Frontend engineering',
    'React',
    'TypeScript',
    'Next.js',
    'GraphQL',
    'Retrieval-augmented generation',
    'Generative AI',
    'Web accessibility',
    'Web performance',
    'Design systems',
    'Fintech',
  ],

  currentRole: {
    title: 'Software Development Engineer II',
    company: 'Novo',
    companyUrl: 'https://www.novo.co',
    since: '2023-08',
  },
} as const;

export const EDUCATION: Education = {
  degree: 'B.Tech',
  field: 'Electronics and Communication Engineering',
  institution: 'Jaypee Institute of Information Technology',
  year: 2020,
};

export const CERTIFICATIONS: readonly Certification[] = [
  { name: 'Google AI Essentials', issuer: 'Google, Coursera', year: 2025 },
  {
    name: 'Introduction to Web Accessibility',
    issuer: 'W3C, edX',
    year: 2024,
  },
  {
    name: 'Interactivity with JavaScript',
    issuer: 'University of Michigan',
    year: 2020,
  },
  {
    name: 'Fundamentals of Graphic Design',
    issuer: 'CalArts',
    year: 2020,
  },
];
