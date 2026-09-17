import type { Metadata } from 'next';
import Link from 'next/link';

import './not-found.scss';

/* Static metadata object only; async generateMetadata is not supported in
   not-found.tsx. No `robots` key here — Next already emits noindex for this
   route, and setting it again produced two conflicting-looking robots tags. */
export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

/*
 * Was "Please select a page from header" beside a bouncing arrow. That asked
 * the reader to go and find the navigation; this offers the pages that
 * do exist.
 */
export default function NotFound() {
  return (
    <div className="error shell shell--prose">
      <p className="error__code u-caps">404</p>
      <h1 className="error__title">That page is not here</h1>
      <p className="error__body">
        It may have moved, or the link may be old. Everything lives on one
        page now:
      </p>
      {/* Fragments, not routes. /work and friends now 308 to /, so linking
          them here would send someone through a redirect to reach a section
          that a fragment reaches directly. */}
      <ul className="error__links">
        <li>
          <Link href="/">Start</Link>
        </li>
        <li>
          <Link href="/#work">Work</Link>
        </li>
        <li>
          <Link href="/#lab">Lab</Link>
        </li>
        <li>
          <Link href="/#contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
