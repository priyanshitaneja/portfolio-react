import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import { iconArrowUp } from '@/components/Icon/icons';
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
        <Icon icon={iconArrowUp} className="error__arrow" />
      </h3>
    </div>
  );
}
