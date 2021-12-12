import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../PureFunctions/Logout";
import "./Nav.css";
const Nav = ({ setUser }) => {
  const history = useHistory();

  const toke = JSON.parse(localStorage.getItem("token"));
  return (
    <nav className="navbar">
      <Link className="navbar-brand ms-3" to="/">
        Trivia Night
      </Link>
      {toke === "" ? (
        <ul className="list-unstyled d-flex py-3 justify-content-end">
          <li className="mx-3">
            <Link className="btn text-decoration-none link-light" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="mx-3">
            <Link className="btn text-decoration-none link-light" to="/login">
              Login
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list-unstyled d-flex py-3 justify-content-end">
          <li className="mx-3">
            <Link className="btn text-decoration-none link-light" to="/">
              Home
            </Link>
          </li>
          <li className="mx-3">
            <button
              className="btn text-decoration-none link-light logout-btn"
              type="submit"
              onClick={(e) => logout(setUser, history)}
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
