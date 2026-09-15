import type { ReactElement } from 'react';

import './index.css';

type SocialIconProps = {
  icon: ReactElement;
  url: string;
  label: string;
  newTab?: boolean;
};

/**
 * SocialIcon — an icon-only link.
 *
 * Icon-only links have no text content, so the accessible name has to come
 * from aria-label. The SVG passed in as `icon` is marked aria-hidden by its
 * source in assets/data.tsx, leaving aria-label as the only name.
 */
const SocialIcon = ({ icon, url, label, newTab = true }: SocialIconProps) => {
  // mailto: hands off to a mail client; a new browsing context is pointless there.
  const opensNewTab = newTab && !url.startsWith('mailto:');

  return (
    <a
      className="social_icon"
      href={url}
      aria-label={opensNewTab ? `${label} (opens in a new tab)` : label}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
    </a>
  );
};

export default SocialIcon;
