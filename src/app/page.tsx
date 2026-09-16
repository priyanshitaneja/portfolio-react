import Link from 'next/link';

import SectionHeading from '@/components/SectionHeading';
import MetricStrip from '@/components/MetricStrip';
import SocialIcons from '@/components/SocialIcons';
import RichText from '@/components/RichText';
import { PROFILE } from '@/content/profile';
import { COMPANIES } from '@/content/companies';
import { LAB } from '@/content/lab';
import { METRICS } from '@/content/metrics';

import './page.css';

/* The four figures that carry the most weight, in the order they are read. */
const PROOF = [
  'ragOnboardingBusinesses',
  'cardSettledVolume',
  'supportAppTti',
  'closureSupportHours',
] as const;

const novo = COMPANIES[0];
/* The five Novo highlights worth homepage space. The rest live on /work. */
const SELECTED = novo.highlights.slice(0, 6);

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero shell">
        <h1 className="home__name">{PROFILE.name}</h1>
        <p className="home__role u-caps">
          {PROFILE.currentRole.title}, {PROFILE.currentRole.company}
        </p>
        <h2 className="home__positioning">{PROFILE.positioning}</h2>
        {PROFILE.intro.map((para) => (
          <p className="home__intro" key={para.slice(0, 24)}>
            {para}
          </p>
        ))}
        <div className="home__actions">
          <Link className="button button--primary" href="/work">
            See the work
          </Link>
          <a className="button" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
        </div>
      </section>

      <section className="home__proof shell section">
        <h2 className="sr-only">By the numbers</h2>
        <MetricStrip ids={PROOF} />
      </section>

      <section className="home__selected shell section">
        <SectionHeading eyebrow="Selected work">
          What I shipped at Novo
        </SectionHeading>
        <ul className="home__list">
          {SELECTED.map((h, i) => (
            <li className="home__list-item" key={i}>
              <p className="home__list-text">
                <RichText value={h.text} />
              </p>
              {h.metricIds?.length ? (
                <p className="home__list-metrics u-figures">
                  {h.metricIds.map((id, j) => (
                    <span key={id}>
                      {j > 0 ? <span aria-hidden="true"> &middot; </span> : null}
                      <strong>{METRICS[id].value}</strong> {METRICS[id].label}
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <Link className="home__more" href="/work">
          The full timeline
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </section>

      <section className="home__before shell section">
        <SectionHeading eyebrow="Before Novo">Where I learned it</SectionHeading>
        <ul className="home__list">
          {COMPANIES.slice(1).map((c) => (
            <li className="home__list-item" key={c.id}>
              <p className="home__list-text">
                <strong>{c.name}</strong>. {c.context}.{' '}
                {c.highlights[0].text as string}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home__lab shell section">
        <SectionHeading eyebrow="Lab">
          Things I build to answer a question
        </SectionHeading>
        <ul className="home__list">
          {LAB.slice(0, 3).map((entry) => (
            <li className="home__list-item" key={entry.slug}>
              <p className="home__list-text">
                <strong>{entry.name}</strong>. {entry.question}
              </p>
            </li>
          ))}
        </ul>
        <Link className="home__more" href="/projects">
          All five experiments
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </section>

      <section className="home__contact shell section">
        <SectionHeading eyebrow="Contact">
          Hiring for a senior or staff frontend role?
        </SectionHeading>
        <p className="u-lede">
          The fastest way to reach me is email. I read everything.
        </p>
        <SocialIcons />
      </section>
    </div>
  );
}
