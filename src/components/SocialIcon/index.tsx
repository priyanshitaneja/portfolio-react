import { type ReactNode } from "react";

import "./index.css";

interface SocialIconProps {
  icon: ReactNode;
  url: string;
  alt: string;
  newTab?: string;
}

const SocialIcon = ({ icon, url, alt, newTab = "true" }: SocialIconProps) => {
  const tabValue = newTab === "true" ? "_random" : "_self";

  return (
    <a className="social_icon" href={url} aria-label={alt} target={tabValue}>
      {icon}
    </a>
  );
};

export default SocialIcon;

// _SEJ instead of _blank
// If a site visitor clicks on the first link, it will spawn a new browser tab.
// If the site visitor clicks the second link,
// it will open the link in the same browser tab as the first link that was clicked,
// essentially reusing that same browser tab.

// _blank HAS SECURITY ISSUES
// if you want to send websites referrer information
// while protecting yourself from the _blank link attribute security issues,
// use the "noopener" link attribute.
// If you'd rather stay private and not pass along referrer information
// while also protecting yourself from security issues associated with using the _blank link attribute,
// then use the rel="noreferrer" link attribute.
