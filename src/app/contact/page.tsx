import type { Metadata } from 'next';

import SocialIcons from '@/components/SocialIcons';
import { PROFILE } from '@/content/profile';
import './page.scss';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Priyanshi Taneja, frontend engineer at Novo: email, LinkedIn ' +
    'and GitHub.',
  alternates: { canonical: '/contact' },
};

/*
 * Was an <h1>Connect Here:</h1> over three icons. A recruiter arriving here
 * wants an address they can copy and a document they can forward, so the email
 * is a real mailto link in body copy rather than a glyph they have to hover to
 * identify.
 */
export default function Contact() {
  return (
    <div className="contact shell shell--prose">
      <h1 className="contact__title">Get in touch</h1>

      <p className="contact__lede u-lede">
        The fastest way to reach me is email. I read everything.
      </p>

      <p className="contact__email">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
      </p>

      <p className="contact__elsewhere">
        Also on{' '}
        <a
          href={PROFILE.socials[0].url}
          aria-label="LinkedIn profile (opens in a new tab)"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{' '}
        and{' '}
        <a
          href={PROFILE.socials[1].url}
          aria-label="GitHub profile (opens in a new tab)"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <SocialIcons />
    </div>
  );
}
