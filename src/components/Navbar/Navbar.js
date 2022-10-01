import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = ({ isLoggedIn, setIsLoggedIn, setIsAdmin }) => {
  return (
    <div id="nav-bar" style={{ position: "sticky" }}>
      <h3 id="nav-title">Gungan Gifts</h3>
      <div id="nav-links">
        <div>
          {isLoggedIn ? (
            <div id="nav-box">
              <span>
                <Link to="/products">Home</Link>
              </span>
              <span>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                  }}
                >
                  Logout
                </Link>
              </span>
              <span>
                <Link to="/usercart">Cart</Link>
              </span>
            </div>
          ) : (
            <div>
              <div>
              <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <Link to="/login">Login</Link>
                </span>
                <span>
                  <Link to="/register">Register</Link>
                </span>
                <span>
                  <Link to="/usercart">Cart</Link>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;