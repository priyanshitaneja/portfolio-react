import Designation from "../../components/Designation"
import SocialIcons from "../../components/SocialIcons";

import "./index.css";

const Homepage = () => {
  return (
    <div className="homepage_wrapper">
      <div className="homepage">
        <section>
          <Designation />
          <SocialIcons />
        </section>
      </div>
    </div>
  );
};

export default Homepage;