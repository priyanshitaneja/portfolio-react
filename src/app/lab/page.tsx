import type { Metadata } from 'next';

import { LAB } from '@/content/lab';
import './page.scss';

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'Five experiments: a client-side PDF to EPUB converter, a Jira Forge ' +
    'planning poker app, and three things built to find out whether a model ' +
    'could do a job.',
  alternates: { canonical: '/lab' },
};

/*
 * Was /projects: a scrolling grid of eleven screenshot cards that mixed
 * weekend builds with paid client work. The client work moved to /work where
 * its conversion numbers mean something, and what is left is organised around
 * the question each experiment answered rather than a feature list.
 *
 * A list rather than a grid. Five entries do not need a grid, and a screenshot
 * of a mood tracker adds nothing a sentence does not.
 */
export default function Lab() {
  return (
    <div className="lab shell">
      <header className="lab__head">
        <h1>Lab</h1>
        <p className="lab__lede u-lede">
          Things I build to answer a question I cannot answer by reading. Each
          one started with something I did not know how to do. Most took a
          weekend. None of them are products.
        </p>
      </header>

      <ol className="lab__list">
        {LAB.map((entry) => (
          <li className="lab__entry" key={entry.slug}>
            <div className="lab__entry-head">
              <h2 className="lab__name">{entry.name}</h2>
              <p className="lab__meta u-figures">
                {entry.year}
                <span aria-hidden="true"> &middot; </span>
                {entry.status}
              </p>
            </div>

            <p className="lab__question">{entry.question}</p>
            <p className="lab__what">{entry.what}</p>
            {entry.finding ? (
              <p className="lab__finding">{entry.finding}</p>
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
          </li>
        ))}
      </ol>
    </div>
  );
}
