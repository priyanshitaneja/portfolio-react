// import ComingSoon from "../../components/ComingSoon";
import NameSvg from "../../components/NameSvg";
import Designation from "../../components/Designation"
import SocialIcons from "../../components/SocialIcons";

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