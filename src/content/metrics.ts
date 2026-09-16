/*
 * The number registry.
 *
 * Every figure on the site is declared here once and referenced by id.
 * Numbers were previously retyped into JSX wherever they appeared, which is
 * how "27,000+" becomes "27,000" on one page and nobody notices. Updating a
 * figure that moves is now a one-line edit rather than a grep.
 *
 * `source` is an audit trail for the author and is never rendered. Everything
 * marked 'resume' is a claim already made in a document that goes to
 * recruiters, so the site and the resume cannot drift apart.
 */

export interface Metric {
  /** Rendered verbatim, including unit and any "+". */
  readonly value: string;
  /** What the number counts. Sentence case, no trailing period. */
  readonly label: string;
  /** Longer gloss for contexts where the short label is too terse. */
  readonly detail?: string;
  readonly source: 'resume' | 'analytics' | 'estimate';
  /** When the figure was last true. */
  readonly asOf?: `${number}-${number}`;
}

export const METRICS = {
  ragOnboardingBusinesses: {
    value: '27,000+',
    label: 'businesses onboarded through a RAG chatbot I built',
    detail:
      'Businesses that have used the retrieval-backed onboarding chatbot to date.',
    source: 'resume',
    asOf: '2026-08',
  },
  cardSettledVolume: {
    value: '$55.1M+',
    label: 'settled through the card experience I built end to end',
    source: 'resume',
    asOf: '2026-08',
  },
  cardActivatedBusinesses: {
    value: '7,800+',
    label: 'businesses activated on Novo Credit Card',
    source: 'resume',
    asOf: '2026-08',
  },
  supportAppTti: {
    value: '63%',
    label: 'faster time to interactive on the support agent app',
    detail:
      'Achieved by moving the data layer from REST to GraphQL while rebuilding a legacy AngularJS app in React and TypeScript.',
    source: 'resume',
  },
  closureAccounts: {
    value: '1,069',
    label: 'accounts closed with no agent, in four months',
    source: 'resume',
  },
  closureSupportHours: {
    value: '178',
    label: 'support hours removed by one self-serve flow',
    source: 'resume',
  },
  collectionsCollected: {
    value: '$117K+',
    label: 'collected on repayment plans in the first four months',
    source: 'resume',
  },
  invoiceTicketReduction: {
    value: '50%',
    label: 'fewer Zendesk tickets about payout issues',
    source: 'resume',
  },
  tailwindProjectsAudited: {
    value: '5',
    label: 'shared projects audited for breaking patterns',
    source: 'resume',
  },
  mgemiPerformance: {
    value: '56 to 77',
    label: 'web performance score on the MGemi storefront',
    source: 'resume',
  },
  beeyaConversion: {
    value: '30%',
    label: 'increase in conversion rate on Beeya Wellness',
    source: 'resume',
  },
  aventonEngagement: {
    value: '15%',
    label: 'increase in engagement rate on Aventon',
    source: 'resume',
  },
  airArabiaDropoff: {
    value: '23%',
    label: 'reduction in add-to-cart drop-off for Air Arabia',
    source: 'resume',
  },
  ikeaCartValue: {
    value: '8.75%',
    label: 'increase in cart value across Ikea Qatar, UAE and Egypt',
    source: 'resume',
  },
  royalEnfieldConversion: {
    value: '5.31% to 33%',
    label: 'visitor-to-lead conversion on the Royal Enfield Meteor launch',
    source: 'resume',
  },
  reliantEngagement: {
    value: '25%',
    label: 'increase in customer engagement for Reliant Energy',
    source: 'resume',
  },
  churnReduction: {
    value: '17 points',
    label: 'churn reduction from A/B experiments',
    source: 'resume',
  },
  loadTimeReduction: {
    value: '40%',
    label: 'reduction in load times from bundle optimisation',
    source: 'resume',
  },
} as const satisfies Record<string, Metric>;

export type MetricId = keyof typeof METRICS;

export const metric = (id: MetricId): Metric => METRICS[id];
