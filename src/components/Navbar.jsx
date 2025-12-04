import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Navbar() {
  const { i18n } = useTranslation();
  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <nav className="flex">
        <h2>Logo</h2>
        <ul className="ul-flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <select onChange={(e) => changeLng(e.target.value)}>
            <option value="uz">O'zbek</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="ko">한국인</option>
            <option value="fr">Français</option>
          </select>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
