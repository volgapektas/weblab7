import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function Layout({ theme, toggleTheme }) {
  return (
    <div className={`app-container ${theme}`}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 Volga Pektaş - Web Programming Assignment 7</p>
      </footer>
    </div>
  );
}
