import { useNavigate } from 'react-router-dom';
import "./index.scss";

const Header = () => {
  const navigate = useNavigate();

  return (
    <ul className="header">
      <li className="nav_link" onClick={() => navigate("/about")}>About</li>
      <li className="nav_link" onClick={() => navigate("/work")}>Work Experience</li>
      <li className="nav_link" onClick={() => navigate("/projects")}>Projects</li>
      <li className="nav_link" onClick={() => navigate("/contact")}>Contact</li>
    </ul> 
  );
};

export default Header;
