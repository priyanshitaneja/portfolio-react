import ComingSoon from "../ComingSoon";
import NameSvg from "../NameSvg";
import Designation from "../Designation"
import SocialIcons from "../SocialIcons";

import "./index.css";

// const logo = require("../../assets/images/name-static.svg").default;

const Homepage = () => {
  return (
    <div className="homepage_wrapper">
      <div className="homepage">
        {/* <img src={logo} alt="hi" /> */}
        <NameSvg />
        <Designation />
        <SocialIcons />
      </div>
    </div>
  );
};

export default Homepage;