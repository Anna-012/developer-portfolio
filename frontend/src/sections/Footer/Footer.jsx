import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Name */}
        <div className="footer-name">
          <h3>Afreen.</h3>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© {currentYear} Afreen. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a href="mailto:your@email.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
