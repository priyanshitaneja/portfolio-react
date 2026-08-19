import SocialIcon from "../SocialIcon";
import { data } from "../../assets/data";

import "./index.css";

const social = data.social_icons;

const SocialIcons = () => {
    return (
        <div className="social_icons">
            <SocialIcon
                icon={social.linkedin.icon}
                url={social.linkedin.url}
                label={social.linkedin.label}
            />
            <SocialIcon
                icon={social.github.icon}
                url={social.github.url}
                label={social.github.label}
            />
            <SocialIcon
                icon={social.gmail.icon}
                url={social.gmail.url}
                label={social.gmail.label}
            />
        </div>
    )
}

export default SocialIcons;
