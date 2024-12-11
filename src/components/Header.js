// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../nonsolus-elsevier.svg"; // Adjust the path as necessary

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-logo-title">
                <img src={logo} alt="Logo" className="header-logo" />
                <div className="header-title">MediExpert</div>
            </div>
            <nav className="header-nav">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/patient-form" className="nav-button">Patient Form</Link>
                <button className="nav-button" onClick={() => alert("RAG Upcoming next Iteration")}>Other</button>
            </nav>
        </header>
    );
};

export default Header;