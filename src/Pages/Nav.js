import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../PureFunctions/Logout";
import "./Nav.css";
const Nav = ({ setUser }) => {
  const history = useHistory();

  const toke = JSON.parse(localStorage.getItem("token"));
  return (
    <nav className="navbar">
      <Link className="navbar-brand ms-2 ms-lg-5" to="/">
        Trivia Night
      </Link>
      <ul className="list-unstyled d-flex py-3 justify-content-end">
        <li className="mx-3">
          <Link className="btn text-decoration-none link-light" to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
