import React from "react";
import "./Header.css"; // Assure-toi que le fichier CSS est dans le même dossier

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Tasks App</h1>
        <nav className="nav">
          <a href="/">Login</a>
          <a href="/Register">Register</a>
          <a href="/Dashboard">Dashboard</a>
        </nav>
      </div>
    </header>
  );
}
