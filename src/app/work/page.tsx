import type { Metadata } from 'next';

import Timeline from '@/components/Timeline';
import SectionHeading from '@/components/SectionHeading';
import { COMPANIES } from '@/content/companies';
import { CERTIFICATIONS, EDUCATION } from '@/content/profile';
import JsonLd from '@/components/JsonLd';
import { workGraph } from '@/content/structured-data';

import './page.scss';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Frontend engineering since 2020: AI agent infrastructure and fintech ' +
    'product at Novo, ecommerce storefronts at ANATTA, conversational AI at ' +
    'Oriserve.',
  alternates: { canonical: '/work' },
};

/*
 * Renders from src/content/companies.ts. The page used to be ~250 lines of
 * hand-written <li> markup with the copy inlined, which meant a reorder was
 * silent and a promotion was invisible.
 *
 * Still zero page JS: Timeline is a server component and the collapsible
 * entries are <details>/<summary>, which the platform makes keyboard operable
 * and announces correctly on its own.
 */
export default function Work() {
  return (
    <div className="work shell">
      <JsonLd data={workGraph} />
      <header className="work__head">
        <h1 className="work__title">Work</h1>
        <p className="work__lede u-lede">
          Frontend since 2020. Three companies, six roles, two promotions.
        </p>
      </header>

      <Timeline companies={COMPANIES} />

      <section className="work__appendix section">
        <SectionHeading eyebrow="Also">Education and certifications</SectionHeading>
        <p className="work__education">
          <strong>
            {EDUCATION.degree}, {EDUCATION.field}
          </strong>
          <br />
          {EDUCATION.institution}, {EDUCATION.year}
        </p>
        <ul className="work__certs">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              {c.name} <span className="work__cert-meta">{c.issuer}, {c.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
