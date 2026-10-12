import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">Afreen sabbagh</div>

        {/* Navigation */}
        <div className="navbar-links">
          <button onClick={() => handleNavClick("home")}>Home</button>

          <button onClick={() => handleNavClick("education")}>Education</button>

          <button onClick={() => handleNavClick("skills")}>Skills</button>

          <button onClick={() => handleNavClick("projects")}>Project</button>

          <button onClick={() => handleNavClick("contact")}>Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
