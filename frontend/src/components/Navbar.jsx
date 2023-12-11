import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setOpenMenu(false);
  };

  return (
    <header className={`burger-menu${openMenu ? " active" : ""}`}>
      <button
        className={`burger-button${openMenu ? " active" : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
        type="button"
        aria-label="Toggle Menu"
      />
      <nav>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Accueil
        </Link>
        <Link
          to="/galerie"
          className={location.pathname === "/galerie" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Galerie
        </Link>
        <Link
          to="/mon-compte"
          className={location.pathname === "/mon-compte" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Mon compte
        </Link>
        <Link
          to="/connexion"
          className={location.pathname === "/connexion" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Connexion
        </Link>
        <Link
          to="/inscription"
          className={location.pathname === "/inscription" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Inscription
        </Link>
        <Link
          to="/classement"
          className={location.pathname === "/classement" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Classement
        </Link>
        <Link
          to="/administration"
          className={location.pathname === "/administration" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Administration
        </Link>
        <Link
          to="/style"
          className={location.pathname === "/style" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Style
        </Link>
      </nav>
    </header>
  );
}
