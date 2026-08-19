import type { Metadata } from 'next';
import './not-found.scss';

/* Static metadata object only; async generateMetadata is not supported in
   not-found.tsx. No `robots` key here — Next already emits noindex for this
   route, and setting it again produced two conflicting-looking robots tags. */
export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="error">
      <h1>404</h1>
      <h3>
        Please select a page from header &nbsp;{' '}
        {/* was `class=`, which React ignored with a warning and TS rejects outright */}
        <i className="fa-solid fa-arrow-up fa-bounce" aria-hidden="true" />
      </h3>
    </div>
  );
}
