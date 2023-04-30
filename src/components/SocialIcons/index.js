import SocialIcon from "../SocialIcon";
import { data } from "../../assets/data";

import "./index.css";

const social = data.social_icons;

const SocialIcons = () => {
    return (
        <div className="social_icons">
            <SocialIcon
                className="social_icon"
                icon={social.linkedin.icon}
                url={social.linkedin.url}
                alt={social.linkedin.alt}
            />
            <SocialIcon
                className="social_icon"
                icon={social.github.icon}
                url={social.github.url}
                alt={social.github.alt}
            />
            <SocialIcon
                className="social_icon"
                icon={social.gmail.icon}
                url={social.gmail.url}
                alt={social.gmail.alt}
            />
        </div>
    )
}

export default SocialIcons;