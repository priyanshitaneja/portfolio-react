import React from "react";
import { data } from "../../assets/data";
import { SocialIcon } from "../SocialIcon";

import "./index.css";

const social = data.social_icons;

const ComingSoon = () => {
  return (
    <div class="coming_soon">
      <h1>coming soon...</h1>
      <div class="social_icons">
        <SocialIcon
          class="social_icon"
          icon={social.linkedin.icon}
          url={social.linkedin.url}
          alt={social.linkedin.alt}
        />
        <SocialIcon
          class="social_icon"
          icon={social.github.icon}
          url={social.github.url}
          alt={social.github.alt}
        />
        <SocialIcon
          class="social_icon"
          icon={social.gmail.icon}
          url={social.gmail.url}
          alt={social.gmail.alt}
        />
      </div>
    </div>
  );
};

export default ComingSoon;
