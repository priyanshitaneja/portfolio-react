import type { Company } from './types';

/*
 * Grouped by company, with the roles nested, rather than one flat timeline
 * node per role.
 *
 * Six identical nodes hid both promotions: two date ranges sitting a few
 * centimetres apart is arithmetic nobody does. Nesting lets the interval be
 * stated as a fact — "promoted after 14 months" — and it turns Oriserve from
 * three bare filler nodes into what it actually is, intern to Software
 * Engineer in twelve months.
 */
export const COMPANIES: readonly Company[] = [
  {
    id: 'novo',
    name: 'Novo',
    url: 'https://www.novo.co',
    context: 'A US fintech for small businesses',
    defaultOpen: true,
    roles: [
      {
        title: 'Software Development Engineer II',
        start: '2024-10',
        end: 'present',
        promotedInto: true,
      },
      {
        title: 'Software Development Engineer L3',
        start: '2023-08',
        end: '2024-10',
      },
    ],
    highlights: [
      {
        text: 'Built the interfaces for Novo’s core AI infrastructure: creating, configuring and monitoring AI agents and the knowledge they draw on. The retrieval-backed chatbot built on it is live in onboarding.',
        metricIds: ['ragOnboardingBusinesses'],
        caseStudy: 'ai-platform',
      },
      {
        text: 'Wrote the Claude Code engineering guidelines and the PR-draft and release skills, then shipped them across the customer and internal applications.',
        caseStudy: 'engineering-guidelines',
      },
      {
        text: 'Built and launched the Novo Credit Card web experience end to end in TypeScript, covering card management, transactions, disputes and rewards redemption.',
        metricIds: ['cardActivatedBusinesses', 'cardSettledVolume'],
      },
      {
        text: 'Rebuilt the support agent app in React and TypeScript as a Kustomer iframe, replacing a legacy AngularJS Zendesk app, and moved its data layer from REST to GraphQL.',
        metricIds: ['supportAppTti'],
        diagram: 'support-app-rebuild',
      },
      {
        text: 'Built the Collections payment portal end to end across the customer app and Admin, for businesses on repayment plans.',
        metricIds: ['collectionsCollected'],
      },
      {
        text: 'Replaced an agent conversation with a flow: self-serve account closure.',
        metricIds: ['closureAccounts', 'closureSupportHours'],
      },
      {
        text: 'Led Invoice Premium, a customisable invoicing product with auto-reconciliation and real-time payment tracking, built to make cash flow legible to small businesses.',
        metricIds: ['invoiceTicketReduction'],
      },
      {
        text: 'Ran the Tailwind v3 to v4 migration on the admin application, then audited every breaking pattern across the shared projects and wrote the migration plan the customer webapp followed.',
        metricIds: ['tailwindProjectsAudited'],
      },
    ],
  },
  {
    id: 'anatta',
    name: 'ANATTA',
    context: 'An ecommerce development studio',
    roles: [{ title: 'UI Developer', start: '2022-06', end: '2023-07' }],
    highlights: [
      {
        text: 'Rebuilt the MGemi storefront with React, targeting load speed and the buying path.',
        metricIds: ['mgemiPerformance'],
      },
      {
        text: 'Built Beeya Wellness solo, to WCAG compliance.',
        metricIds: ['beeyaConversion'],
      },
      {
        text: 'Delivered the Aventon storefront to design spec with Tailwind CSS.',
        metricIds: ['aventonEngagement'],
      },
    ],
  },
  {
    id: 'oriserve',
    name: 'Oriserve',
    context: 'Conversational AI for enterprise brands',
    roles: [
      {
        title: 'Software Engineer',
        start: '2021-04',
        end: '2022-05',
        promotedInto: true,
      },
      {
        title: 'Junior Software Engineer',
        start: '2020-08',
        end: '2021-04',
        promotedInto: true,
      },
      {
        title: 'Frontend Development Intern',
        start: '2020-04',
        end: '2020-08',
      },
    ],
    highlights: [
      {
        text: 'Built in-chat food ordering with React for Air Arabia in the UAE.',
        metricIds: ['airArabiaDropoff'],
        roleTitle: 'Software Engineer',
      },
      {
        text: 'Took the Ikea chatbots multilingual across Qatar, the UAE and Egypt.',
        metricIds: ['ikeaCartValue'],
        roleTitle: 'Software Engineer',
      },
      {
        text: 'Led the omnichannel chatbot for the Royal Enfield Meteor launch, end to end through deployment.',
        metricIds: ['royalEnfieldConversion'],
        roleTitle: 'Software Engineer',
      },
      {
        text: 'Built conversational advertisement chatbots for Reliant Energy.',
        metricIds: ['reliantEngagement'],
        roleTitle: 'Junior Software Engineer',
      },
      {
        text: 'Ran A/B experiments across the chatbot fleet to cut drop-off and retention loss.',
        metricIds: ['churnReduction'],
        roleTitle: 'Junior Software Engineer',
      },
      {
        text: 'Cut platform load times through bundle optimisation and workflow redesign.',
        metricIds: ['loadTimeReduction'],
        roleTitle: 'Junior Software Engineer',
      },
      {
        text: 'Built components and chatbot experiences for Vi, Tata Sky, Bajaj Auto, Aldo Shoes, WeWork and 6th Street.',
        roleTitle: 'Frontend Development Intern',
      },
    ],
  },
];
