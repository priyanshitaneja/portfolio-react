import { useNavigate } from 'react-router-dom';
import "./index.scss";

const Header = () => {
  const navigate = useNavigate();

  return (
    <ul className="header">
      <li onClick={() => navigate("/about")}>About</li>
      <li onClick={() => navigate("/work")}>Work Experience</li>
      <li onClick={() => navigate("/projects")}>Projects</li>
      <li onClick={() => navigate("/contact")}>Contact</li>
    </ul>
  );
};

export default Header;
