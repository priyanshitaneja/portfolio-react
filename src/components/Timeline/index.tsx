import Link from 'next/link';

import type { Company, Highlight } from '@/content/types';
import RichText from '@/components/RichText';
import { METRICS } from '@/content/metrics';
import { isPublished } from '@/content/case-studies';
import Diagram from '@/components/Diagram';
import {
  dateTimeAttr,
  formatShort,
  humaniseDuration,
  monthsBetween,
} from '@/content/dates';
import './index.scss';

const Range = ({
  start,
  end,
}: {
  start: `${number}-${number}`;
  end: `${number}-${number}` | 'present';
}) => (
  <span className="timeline__range u-figures">
    <time dateTime={dateTimeAttr(start)}>{formatShort(start)}</time>
    {' – '}
    {end === 'present' ? (
      'Present'
    ) : (
      <time dateTime={dateTimeAttr(end)}>{formatShort(end)}</time>
    )}
  </span>
);

const HighlightItem = ({ highlight }: { highlight: Highlight }) => (
  <li className="timeline__highlight">
    <p className="timeline__highlight-text">
      <RichText value={highlight.text} />
    </p>

    {highlight.metricIds?.length ? (
      <p className="timeline__highlight-metrics u-figures">
        {highlight.metricIds.map((id, i) => (
          <span key={id}>
            {i > 0 ? <span aria-hidden="true"> · </span> : null}
            <strong>{METRICS[id].value}</strong> {METRICS[id].label}
          </span>
        ))}
      </p>
    ) : null}

    {highlight.diagram ? <Diagram id={highlight.diagram} /> : null}

    {highlight.caseStudy && isPublished(highlight.caseStudy) ? (
      <Link
        className="timeline__case-link"
        href={`/work/${highlight.caseStudy}`}
      >
        Read the case study
        <span aria-hidden="true"> &rarr;</span>
      </Link>
    ) : null}
  </li>
);

/*
 * One block per company, with roles nested inside it.
 *
 * The version this replaces was one flat node per role, which made a promotion
 * invisible: six identically-weighted dots, and the reader left to subtract
 * dates. Here the interval is stated outright.
 */
const Timeline = ({
  companies,
  headingLevel = 2,
}: {
  companies: readonly Company[];
  /* The level a company name renders at. It depends on what is above it in
     the document, not on the component, so the caller owns it — that is the
     only way heading order stays correct when the page structure changes. */
  headingLevel?: 2 | 3;
}) => (
  <ol className="timeline">
    {companies.map((company, index) => {
      const CompanyHeading = (headingLevel === 3 ? 'h3' : 'h2') as 'h2' | 'h3';
      const newest = company.roles[0];
      const oldest = company.roles[company.roles.length - 1];

      return (
        /* The first block is inside the first viewport, so it never
           reveals — an element partially in view starts mid-animation below
           full opacity, and Chrome's LCP algorithm discards anything at
           opacity 0. */
        <li
          className={`timeline__company${index > 0 ? ' reveal' : ''}`}
          key={company.id}>
          <div className="timeline__company-head">
            <CompanyHeading className="timeline__company-name">
              {company.url ? (
                <a
                  href={company.url}
                  aria-label={`${company.name} (opens in a new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.name}
                </a>
              ) : (
                company.name
              )}
            </CompanyHeading>
            <Range start={oldest.start} end={newest.end} />
            <p className="timeline__context">{company.context}</p>
          </div>

          <ol className="timeline__roles">
            {company.roles.map((role, i) => {
              /* The role below this one in the list is the one it was
                 promoted from, so the interval is that role's own length. */
              const from = company.roles[i + 1];
              return (
                <li className="timeline__role" key={role.title}>
                  <p className="timeline__role-title">{role.title}</p>
                  <Range start={role.start} end={role.end} />
                  {role.promotedInto && from ? (
                    <p className="timeline__promotion">
                      Promoted after{' '}
                      {humaniseDuration(monthsBetween(from.start, from.end))}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>

          {/* <details> rather than a JS accordion: keyboard operable and
              announced correctly with no JavaScript at all. */}
          <details className="timeline__body" open={company.defaultOpen}>
            {/* A static label: "Show"/"Hide" cannot stay truthful without
                JS, and <details> already announces its own expanded state. */}
            <summary>
              <span>What I shipped at {company.name}</span>
            </summary>
            <ul className="timeline__highlights">
              {company.highlights.map((h, i) => (
                <HighlightItem highlight={h} key={i} />
              ))}
            </ul>
          </details>
        </li>
      );
    })}
  </ol>
);

export default Timeline;
