import { useAtom } from "jotai";
import { Container, Navbar } from "react-bootstrap";
import { themeAtom } from "../store";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Navbar className={theme === "light" ? "bg-peach" : "bg-grey"}>
      <Container className="fw-bold fs-3 d-flex justify-content-around">
        <div>Finacial Tracker</div>
        <button
          className="btn btn-transparent d-flex align-items-center"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} className="theme-icon" />
        </button>
      </Container>
    </Navbar>
  );
};

export default Header;
