import { NavLink } from "react-router-dom";
import "./index.scss";

const Header = () => {
  return (
    <ul className="header">
      <li>
        <NavLink to={"/about"} className="nav_link">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to={"/work"} className="nav_link">
          Work Experience
        </NavLink>
      </li>
      <li>
        <NavLink to={"/projects"} className="nav_link">
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink to={"/contact"} className="nav_link">
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default Header;
