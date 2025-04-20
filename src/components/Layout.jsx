import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <nav className="layout-nav">
          <div className="nav-content">
            <Link to="/" className="layout-logo">
              <svg className="logo-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9v6l-8 4-8-4V9l8-4.2z" />
                <path d="M12 16l-4-2v-4l4 2 4-2v4l-4 2z" />
              </svg>
              <span className="layout-brand">CrewManager</span>
            </Link>

            <div className="nav-links">
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/create" className="nav-link">Create</Link>
              <Link to="/about" className="nav-link">About</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} CrewManager. All rights reserved.</p>
          <p className="footer-credit">Built with ❤️ by Tasneem Shabana</p>
        </div>
      </footer>
    </div>
  );
}