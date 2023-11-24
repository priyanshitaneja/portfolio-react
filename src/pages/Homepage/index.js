import Designation from "../../components/Designation"
import ProfileImage from "../../components/ProfileImage"
import SocialIcons from "../../components/SocialIcons";

import "./index.css";

const Homepage = () => {
  return (
    <div className="homepage_wrapper">
      <div className="homepage">
        <section>
          <div className="text-image">
            <Designation />
            <ProfileImage />
          </div>
          <SocialIcons />
        </section>
      </div>
    </div>
  );
};

export default Homepage;