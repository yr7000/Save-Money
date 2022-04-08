import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import darkThemeIcon from "../assets/dark.svg";
import lightThemeIcon from "../assets/light.svg";

export default function Navbar() {
  const { logout } = useLogout();
  const { user, theme, dispatch } = useAuthContext();
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch({ type: "changeTheme", payload: newTheme });
  };

  return (
    <nav className={theme === "light" ? styles.navbar : styles.navbarDark}>
      <ul>
        <li className={styles.title}>
          <Link to="/">Save money</Link>
        </li>
        <li className="theme-toggle">
          <img
            src={theme === "light" ? darkThemeIcon : lightThemeIcon}
            alt="dark-light-toggler"
            onClick={toggleTheme}
          />
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li className={styles.userName}>{user.displayName}</li>
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
