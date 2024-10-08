import "./Nav.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Nav({ loggedInUser, mobileMenuToggle, setMobileMenuToggle, cart }) {
  const [scroll, setScroll] = useState(false);
  const changeColor = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const cartQty = cart?.CartItem?.reduce((acc, curr) => acc + curr.qty, 0);
  return (
    <nav className={scroll ? "nav-root scrolled" : "nav-root"}>
      <div className="nav-spread">
        <div className="nav-logo">
          <Link className="nav-link" to={"/"}>
            <img src={logo} />
          </Link>
        </div>
        <ul className="nav-links-list">
          <Link className="nav-link" to={"/premade"}>
            <li>Products</li>
          </Link>
          {loggedInUser?.userId ? (
            <Link className="nav-link" to={"/account"}>
              <li>
                {loggedInUser.fName} {loggedInUser.lName}
              </li>
            </Link>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              <li>Sign In</li>
            </Link>
          )}

          <Link className="nav-link" to={"/cart"}>
            <li>
              <div className="nav-cart-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="nav-cart-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span>({cartQty})</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
      {/* Mobile Nav */}
      <div className="nav-condensed">
        <div className="nav-logo">
          <Link className="nav-link" to={"/"}>
            <img src={logo} />
          </Link>
        </div>
        <div className="nav-hamburger-container">
          <svg
            // xmlns="http://www.w3.org/2000/svg"
            // fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="nav-hamburger"
            onClick={() => setMobileMenuToggle(!mobileMenuToggle)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      {/* {mobileMenuToggle && ( */}
      <div
        className={
          mobileMenuToggle
            ? "nav-condensed-display-show"
            : "nav-condensed-display-hidden"
        }
      >
        <div className="nav-condensed-close-container">
          <svg
            // xmlns="http://www.w3.org/2000/svg"
            // fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="nav-condensed-close-button"
            onClick={() => setMobileMenuToggle(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <ul className="mobile-nav-links-list">
          <li onClick={() => setMobileMenuToggle(false)}>
            <Link className="mobile-nav-link" to={"/premade"}>
              Premade
            </Link>
          </li>
          <li onClick={() => setMobileMenuToggle(false)}>
            <Link className="mobile-nav-link" to={"/custom"}>
              Custom
            </Link>
          </li>
          <li onClick={() => setMobileMenuToggle(false)}>
            {loggedInUser?.userId ? (
              <Link className="mobile-nav-link" to={"/account"}>
                {loggedInUser.fName} {loggedInUser.lName}
              </Link>
            ) : (
              <Link className="mobile-nav-link" to={"/auth"}>
                Sign in
              </Link>
            )}
          </li>
          <li onClick={() => setMobileMenuToggle(false)}>
            <Link className="mobile-nav-link" to={"/cart"}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="nav-cart-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span>({cartQty})</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* )} */}
    </nav>
  );
}

export default Nav;
