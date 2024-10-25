import React from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={`row ${styles.navbar}`}>
      <nav>
        <ul>
          <li className="col-md">
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="col-md">
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/"
            >
              Main
            </NavLink>
          </li>
          <li className="col-md">
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/mydrivers"
            >
              My Drivers
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
