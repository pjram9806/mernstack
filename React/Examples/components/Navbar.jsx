import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiGift,
  FiUser,
  FiPhone,
  FiMail,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown or mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, mobileMenuOpen]);

  // Reset menus when user changes
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [user]);

  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="ct-header">
      {/* Top Navbar */}
      <div className="ct-navbar">
        {/* Logo */}
        <div className="ct-logo-section">
          <img src="/airlineLogo.png" alt="Logo" className="ct-logo-image" />
        </div>

        {/* Desktop Navigation */}
        <div className="ct-navbar-right desktop-only">
          <div className="ct-navbar-link">
            <FiGift className="ct-navbar-icon" />
            <span>Offers</span>
          </div>
          <div className="ct-navbar-link">
            <FiUser className="ct-navbar-icon" />
            <span>My Trips</span>
          </div>
          <div className="ct-navbar-link">
            <FiPhone className="ct-navbar-icon" />
            <NavLink to="/contact" className="ct-navbar-contact">
              +91 91641 11114
            </NavLink>
          </div>
          <div className="ct-navbar-link">
            <FiMail className="ct-navbar-icon" />
            <NavLink to="/contact" className="ct-navbar-contact">
              info@samskruthiairlines.com
            </NavLink>
          </div>

          {user ? (
            <div
              className="ct-navbar-link ct-user-name"
              ref={dropdownRef}
              style={{ position: "relative" }}
            >
              <div
                className="ct-user-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 12px",
                  borderRadius: "18px",
                  background: "#fff7f3",
                  boxShadow: "0 1px 4px rgba(255,90,31,0.06)",
                  cursor: "pointer",
                }}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span className="ct-user-avatar">
                  {user?.name?.[0] || user?.email?.[0]}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#222",
                    textTransform: "capitalize",
                  }}
                >
                  {user?.name}
                </span>
              </div>
              {dropdownOpen && (
                <div
                  className="ct-user-dropdown"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    borderRadius: 8,
                    zIndex: 1000,
                    minWidth: 120,
                  }}
                >
                  <button
                    className="ct-logout-btn professional"
                    onClick={onLogout}
                    aria-label="Logout"
                  >
                    <FiLogOut
                      style={{ fontSize: "1.25em", verticalAlign: "middle" }}
                    />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="ct-login-btn" onClick={onLoginClick}>
              Log in
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-toggle mobile-only">
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" ref={mobileMenuRef}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <img
                src="/airlineLogo.png"
                alt="Logo"
                className="mobile-logo"
              />
              <button className="mobile-close-btn" onClick={closeMobileMenu}>
                <FiX />
              </button>
            </div>

            {/* Links */}
            <div className="mobile-menu-links">
              <div className="mobile-navbar-link">
                <FiGift className="mobile-navbar-icon" />
                <span>Offers</span>
              </div>
              <div className="mobile-navbar-link">
                <FiUser className="mobile-navbar-icon" />
                <span>My Trips</span>
              </div>
              <div className="mobile-navbar-link">
                <FiPhone className="mobile-navbar-icon" />
                <NavLink
                  to="/contact"
                  className="mobile-navbar-contact"
                  onClick={closeMobileMenu}
                >
                  +91 91641 11114
                </NavLink>
              </div>
              <div className="mobile-navbar-link">
                <FiMail className="mobile-navbar-icon" />
                <NavLink
                  to="/contact"
                  className="mobile-navbar-contact"
                  onClick={closeMobileMenu}
                >
                  info@samskruthiairlines.com
                </NavLink>
              </div>
            </div>

            {/* Mobile User Section */}
            <div className="mobile-user-section">
              {user ? (
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">
                    {user?.name?.[0] || user?.email?.[0]}
                  </div>
                  <div className="mobile-user-details">
                    <span className="mobile-user-name">{user?.name}</span>
                    <button
                      className="mobile-logout-btn"
                      onClick={() => {
                        onLogout();
                        closeMobileMenu();
                      }}
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="mobile-login-btn"
                  onClick={() => {
                    onLoginClick();
                    closeMobileMenu();
                  }}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="ct-navbar-divider" />

      {/* Main Navigation Tabs */}
      <div className="ct-nav-tabs">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-flights${isActive ? " ct-nav-tab-active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_flights.png"
              alt="Flights"
              className="ct-tab-icon-img"
            />
            <span>Flights</span>
          </div>
        </NavLink>

        <NavLink
          to="/hotels"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-hotels${isActive ? " ct-nav-tab-active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_hotel.png"
              alt="Hotels"
              className="ct-tab-icon-img"
            />
            <span>Hotels</span>
          </div>
        </NavLink>

        <NavLink
          to="/buses"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-buses${isActive ? " ct-nav-tab-active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_bus.png"
              alt="Buses"
              className="ct-tab-icon-img"
            />
            <span>Buses</span>
          </div>
        </NavLink>

        <NavLink
          to="/cabs"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-cabs${isActive ? " ct-nav-tab-active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_cab.png"
              alt="Cabs"
              className="ct-tab-icon-img"
            />
            <span>Cabs</span>
          </div>
        </NavLink>

        <NavLink
          to="/visa-services"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-visa${isActive ? " ct-nav-tab-active" : ""}`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_visa.png"
              alt="Visa"
              className="ct-tab-icon-img"
            />
            <span>Visa</span>
          </div>
        </NavLink>

        <NavLink
          to="/packages"
          className={({ isActive }) =>
            `ct-nav-tab ct-nav-tab-packages${
              isActive ? " ct-nav-tab-active" : ""
            }`
          }
          onClick={closeMobileMenu}
        >
          <div className="ct-tab-content">
            <img
              src="/Navbar_package.png"
              alt="Packages"
              className="ct-tab-icon-img"
            />
            <span>Packages</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
