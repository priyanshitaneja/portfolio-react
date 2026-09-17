import Timeline from '@/components/Timeline';
import JsonLd from '@/components/JsonLd';
import { PROFILE, CERTIFICATIONS, EDUCATION } from '@/content/profile';
import { COMPANIES } from '@/content/companies';
import { LAB } from '@/content/lab';
import { homeGraph } from '@/content/structured-data';

import './page.css';

/*
 * One document.
 *
 * The previous homepage was landing-page anatomy: a display-size statement
 * above the fold, a four-across band of large figures, a filled primary button
 * beside a ghost secondary, and an uppercase eyebrow over every section. Those
 * are persuasion devices. They read as a product being sold, which is the
 * wrong register for someone being evaluated on what they have built.
 *
 * What replaces them: the name and the role, two paragraphs at reading size,
 * the address as plain text, and then the work itself. The figures stay, but
 * inline against the thing they measure, where they are evidence rather than
 * a headline.
 */
export default function Home() {
  return (
    <div className="doc" id="top">
      <JsonLd data={homeGraph} />

      <header className="doc__head shell">
        <h1 className="doc__name">{PROFILE.name}</h1>
        <p className="doc__role">
          {PROFILE.currentRole.title},{' '}
          <a
            href={PROFILE.currentRole.companyUrl}
            aria-label="Novo (opens in a new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {PROFILE.currentRole.company}
          </a>
        </p>

        {PROFILE.intro.map((para) => (
          <p className="doc__intro" key={para.slice(0, 24)}>
            {para}
          </p>
        ))}

        <p className="doc__contact">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <span aria-hidden="true"> · </span>
          <a
            href={PROFILE.socials[0].url}
            aria-label="LinkedIn profile (opens in a new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href={PROFILE.socials[1].url}
            aria-label="GitHub profile (opens in a new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </header>

      <section className="doc__section shell" id="work">
        <h2 className="doc__section-title">Work</h2>
        <Timeline companies={COMPANIES} headingLevel={3} />
      </section>

      <section className="doc__section shell" id="lab">
        <h2 className="doc__section-title">Lab</h2>
        <p className="doc__section-note">
          Things I build to answer a question I cannot answer by reading. Most
          took a weekend. None of them are products.
        </p>

        <ol className="lab">
          {LAB.map((entry, index) => (
            <li className={`lab__row${index > 0 ? ' reveal' : ''}`} key={entry.slug}>
              <h3 className="lab__name">{entry.name}</h3>
              <p className="lab__year u-figures">{entry.year}</p>
              <div className="lab__detail">
                <p className="lab__question">{entry.question}</p>
                <p className="lab__what">{entry.what}</p>
                {entry.finding ? (
                  <p className="lab__what">{entry.finding}</p>
                ) : null}
                <p className="lab__links">
                  {entry.liveUrl ? (
                    <a
                      href={entry.liveUrl}
                      aria-label={`${entry.name}, live site (opens in a new tab)`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live
                    </a>
                  ) : null}
                  {entry.sourceUrl ? (
                    <a
                      href={entry.sourceUrl}
                      aria-label={`${entry.name}, source on GitHub (opens in a new tab)`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="doc__section shell" id="also">
        <h2 className="doc__section-title">Education</h2>
        <p className="doc__edu">
          {EDUCATION.degree}, {EDUCATION.field}
          <span className="doc__muted">
            {' '}
            — {EDUCATION.institution}, {EDUCATION.year}
          </span>
        </p>
        <ul className="doc__certs">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              {c.name}
              <span className="doc__muted">
                {' '}
                — {c.issuer}, {c.year}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="doc__section shell" id="contact">
        <h2 className="doc__section-title">Contact</h2>
        <p className="doc__contact-line">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      </section>
    </div>
  );
}
