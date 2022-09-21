import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div id="nav-bar" style={{ position: "sticky" }}>
      <h3 id="nav-title">Gungan Gifts</h3>
      <div id="nav-links">
        <div>
          {isLoggedIn ? (
            <div>
              <span>
                <Link to="/products">Home</Link>
              </span>
              <span>
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
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
                  <Link to="/login">Login</Link>
                </span>
                <span>
                  <Link to="/register">Register</Link>
                </span>
                <span>
                  <Link to="/guestcart">Cart</Link>
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