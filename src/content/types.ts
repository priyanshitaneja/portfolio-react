import type { MetricId } from './metrics';

/*
 * Note: types.ts imports MetricId from metrics.ts and metrics.ts imports
 * Metric from here. That is a type-only cycle, fully erased at compile time,
 * and TypeScript resolves it without complaint. It is stated here so nobody
 * "fixes" it into a third file.
 */

/* ── Inline text ──
 * A plain string covers the overwhelming majority of sentences. The array form
 * is only reached when a sentence needs a link or emphasis inside it, which
 * keeps the content files readable instead of turning every paragraph into a
 * tree of nodes.
 */
export type InlineNode =
  | string
  | { readonly kind: 'link'; readonly text: string; readonly href: string }
  | { readonly kind: 'em'; readonly text: string }
  | { readonly kind: 'metric'; readonly id: MetricId };

export type RichText = string | readonly InlineNode[];

/* ── Long-form blocks ──
 * A closed union rather than MDX. MDX would add build dependencies to a repo
 * that runs on four runtime deps under an enforced bundle budget, and it would
 * put copy back inside markup, which is the thing this module exists to undo.
 *
 * Every renderer is a server component, so the content layer costs zero client
 * JavaScript.
 */
export type Block =
  | { readonly kind: 'paragraph'; readonly text: RichText }
  | {
      readonly kind: 'heading';
      readonly level: 3 | 4;
      readonly text: string;
      readonly id?: string;
    }
  | {
      readonly kind: 'list';
      readonly style: 'bullet' | 'number';
      readonly items: readonly RichText[];
    }
  | { readonly kind: 'metrics'; readonly ids: readonly MetricId[] }
  | {
      readonly kind: 'pullQuote';
      readonly text: string;
      readonly attribution?: string;
    }
  | {
      readonly kind: 'figure';
      readonly diagram: DiagramId;
      readonly caption?: RichText;
    }
  | {
      readonly kind: 'callout';
      readonly tone: 'note' | 'constraint' | 'tradeoff';
      readonly title?: string;
      readonly blocks: readonly Block[];
    }
  /*
   * An unanswered interview question, as data rather than a TODO comment.
   * The renderer shows it loudly in development and throws during the
   * production build, so a draft marker physically cannot reach the live site.
   */
  | { readonly kind: 'draft'; readonly question: string; readonly ref?: string };

/*
 * Only one id, deliberately.
 *
 * Two further diagrams were planned — career progression and an impact
 * overview — and both were dropped once the components existed, because each
 * would have drawn a second picture of something already on the page. The
 * Timeline *is* the career progression, with the promotion intervals stated
 * as text rather than inferred from a shape, and MetricStrip is the impact
 * overview. A diagram that restates its neighbour is decoration.
 */
export type DiagramId = 'support-app-rebuild';

/* ── Case studies ── */
export interface CaseStudySection {
  /* The canonical four autocomplete; `(string & {})` keeps the door open for a
     fifth without widening the type to plain string everywhere. */
  readonly id: 'constraint' | 'decision' | 'built' | 'outcome' | (string & {});
  readonly title: string;
  readonly blocks: readonly Block[];
}

export interface CaseStudy {
  readonly slug: string;
  /** Renders as "Case study 01". */
  readonly index: number;
  readonly title: string;
  /** One-sentence standfirst under the h1. */
  readonly deck: string;
  /** Used verbatim as the meta description and the OG description. */
  readonly summary: string;
  readonly company: string;
  readonly companyUrl: string;
  readonly role: string;
  readonly period: string;
  readonly team?: string;
  readonly stack: readonly string[];
  readonly surfaces: readonly string[];
  /** The figures in the header strip. */
  readonly headlineMetrics: readonly MetricId[];
  readonly sections: readonly CaseStudySection[];
  readonly published: `${number}-${number}-${number}`;
  readonly updated: `${number}-${number}-${number}`;
}

/* ── Work timeline ── */
export interface Role {
  readonly title: string;
  readonly start: `${number}-${number}`;
  readonly end: `${number}-${number}` | 'present';
  /*
   * True when this title was reached by promotion from the next entry in the
   * company's `roles` array. Drives the promotion marker and the "Promoted
   * after N months" line — precisely the signal a flat list of six identical
   * timeline nodes destroys.
   */
  readonly promotedInto?: boolean;
}

export interface Highlight {
  readonly text: RichText;
  /** Attributes the work to the level it was done at, without splitting the
      company block in two. Matches a Role.title. */
  readonly roleTitle?: string;
  readonly metricIds?: readonly MetricId[];
  /** Renders a link through to the deep page when one exists. */
  readonly caseStudy?: string;
  /** Renders the diagram registered under this id beneath the highlight. */
  readonly diagram?: DiagramId;
}

export interface Company {
  readonly id: string;
  readonly name: string;
  readonly url?: string;
  /** One line for a reader who has not heard of the company. */
  readonly context: string;
  /** Newest first. */
  readonly roles: readonly Role[];
  readonly highlights: readonly Highlight[];
  /** Expanded on first paint. Current employer only. */
  readonly defaultOpen?: boolean;
}

/* ── Lab ── */
export interface LabEntry {
  readonly slug: string;
  readonly name: string;
  /*
   * The thing that was not known, phrased as a question. Required, not
   * optional: it is the field that makes Lab read as deliberate experiments
   * rather than a portfolio grid, and an entry without one does not belong.
   */
  readonly question: string;
  /** What it is. One sentence, present tense. */
  readonly what: string;
  /** What it settled. Two sentences at most. */
  readonly finding?: string;
  readonly year: number;
  readonly status: 'live' | 'source only' | 'archived';
  readonly liveUrl?: string;
  readonly sourceUrl?: string;
}

/* ── Profile ── */
export interface SocialLink {
  readonly id: 'linkedin' | 'github' | 'email';
  readonly label: string;
  readonly url: string;
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly year: number;
}

export interface Education {
  readonly degree: string;
  readonly field: string;
  readonly institution: string;
  readonly year: number;
}
