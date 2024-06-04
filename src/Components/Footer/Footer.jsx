import "./Footer.css";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <ul className="footer-links">
        <Link to="/CGU" className="links">
          Terms and conditions
        </Link>
        <Link to="/legal_notice" className="links">
          Legal Notice
        </Link>
        <Link to="/contact" className="links">
          Contact us
        </Link>
      </ul>
      <div className="footer-social-links">
        <a
          href="https://www.linkedin.com/in/laura-kalmanova-330a69224/"
          target="_blank"
          className="footer-logo-container"
        >
          <LinkedInIcon sx={{ color: "#FFC900", fontSize: 40 }} />
        </a>
        <a
          href="https://fr-fr.facebook.com/"
          target="_blank"
          className="footer-logo-container"
        >
          <FacebookIcon sx={{ color: "#FFC900", fontSize: 40 }} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="footer-logo-container"
        >
          <InstagramIcon sx={{ color: "#FFC900", fontSize: 40 }} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
