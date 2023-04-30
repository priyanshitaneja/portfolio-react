import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const SocialIcon = ({ icon, url, alt, newTab }) => {
  const tabValue = newTab === "true" ? "_random" : "_self";

  return (
    <a className="social_icon" href={url} alt={alt} target={tabValue}>
      {icon}
    </a>
  );
};

SocialIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  alt: PropTypes.string.isRequired,
  newTab: PropTypes.string.isRequired,
};

SocialIcon.defaultProps = {
  newTab: "true",
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
// use the “noopener” link attribute.
// If you’d rather stay private and not pass along referrer information
// while also protecting yourself from security issues associated with using the _blank link attribute,
// then use the rel=”noreferrer” link attribute.
