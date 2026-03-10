import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("/admin/dashboard");
  const [scrolled, setScrolled] = useState(false);

  const Navlinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "⊞" },
    { name: "Hero Section", path: "/admin/manage-hero-section", icon: "◈" },
    { name: "Services", path: "/admin/manage-services", icon: "◎" },
    { name: "Products", path: "/admin/manage-products", icon: "▣" },
    { name: "Designers", path: "/admin/manage-designers", icon: "◉" },
    { name: "Orders", path: "/admin/manage-orders", icon: "◫" },
    { name: "Settings", path: "/admin/settings", icon: "⚙" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #0a0a0f;
          --surface: #111118;
          --border: rgba(255,255,255,0.07);
          --accent: #e8ff47;
          --accent-dim: rgba(232,255,71,0.12);
          --text: #f0f0f5;
          --muted: #6b6b80;
          --danger: #ff4757;
        }

        body { background: var(--bg); }

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'Syne', sans-serif;
          transition: all 0.3s ease;
          background: ${scrolled ? "rgba(10,10,15,0.92)" : "var(--surface)"};
          backdrop-filter: ${scrolled ? "blur(20px)" : "none"};
          border-bottom: 1px solid ${scrolled ? "rgba(232,255,71,0.15)" : "var(--border)"};
        }

        .nav-inner {
          max-width: 95%;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-mark {
          width: 34px;
          height: 34px;
          background: var(--accent);
          border-radius: 8px;
          display: grid;
          place-items: center;
          font-size: 14px;
          font-weight: 800;
          color: var(--bg);
          letter-spacing: -1px;
          flex-shrink: 0;
        }

        .logo-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: 0.5px;
        }

        .logo-badge {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          font-weight: 400;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(232,255,71,0.25);
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          border: 1px solid transparent;
          letter-spacing: 0.3px;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent-dim);
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 8px;
        }

        .nav-link:hover {
          color: var(--text);
          border-color: var(--border);
        }

        .nav-link:hover::before { opacity: 1; }

        .nav-link.active {
          color: var(--accent);
          background: var(--accent-dim);
          border-color: rgba(232,255,71,0.25);
        }

        .nav-icon {
          font-size: 11px;
          opacity: 0.7;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .notif-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border);
          cursor: pointer;
          display: grid;
          place-items: center;
          color: var(--muted);
          font-size: 15px;
          transition: all 0.2s;
          position: relative;
        }

        .notif-btn:hover {
          background: var(--accent-dim);
          border-color: rgba(232,255,71,0.25);
          color: var(--accent);
        }

        .notif-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 6px;
          height: 6px;
          background: var(--danger);
          border-radius: 50%;
          border: 1.5px solid var(--surface);
        }

        .avatar-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3a3a5c, #1e1e35);
          border: 1.5px solid rgba(232,255,71,0.3);
          cursor: pointer;
          display: grid;
          place-items: center;
          color: var(--accent);
          font-size: 13px;
          font-weight: 700;
          transition: all 0.2s;
          font-family: 'Syne', sans-serif;
        }

        .avatar-btn:hover {
          border-color: var(--accent);
          box-shadow: 0 0 12px rgba(232,255,71,0.2);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          transition: all 0.2s;
        }

        .hamburger:hover {
          background: var(--accent-dim);
          border-color: rgba(232,255,71,0.25);
        }

        .bar {
          width: 20px;
          height: 1.5px;
          background: var(--muted);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open .bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: var(--accent);
        }
        .hamburger.open .bar:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .hamburger.open .bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: var(--accent);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 3px;
          padding: 12px 16px 16px;
          border-top: 1px solid var(--border);
          background: var(--surface);
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
          letter-spacing: 0.3px;
        }

        .mobile-link:hover {
          color: var(--text);
          background: rgba(255,255,255,0.04);
          border-color: var(--border);
        }

        .mobile-link.active {
          color: var(--accent);
          background: var(--accent-dim);
          border-color: rgba(232,255,71,0.2);
        }

        .mobile-icon {
          font-size: 14px;
          width: 20px;
          text-align: center;
        }

        .mobile-divider {
          height: 1px;
          background: var(--border);
          margin: 8px 0;
        }

        @media (max-width: 1100px) {
          .nav-link { padding: 7px 10px; font-size: 12px; }
          .nav-links { gap: 1px; }
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu.open { display: flex; }
        }

        @media (max-width: 480px) {
          .logo-badge { display: none; }
          .nav-inner { padding: 0 16px; }
        }

        /* Demo page */
        .demo-page {
          min-height: 100vh;
          background: var(--bg);
          padding-top: 64px;
          font-family: 'Syne', sans-serif;
        }

        .demo-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 24px;
          color: var(--muted);
          text-align: center;
        }

        .demo-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .demo-title span { color: var(--accent); }

        .demo-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 1px;
          color: var(--muted);
        }

        .demo-grid {
          margin-top: 60px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .demo-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px 20px;
          text-align: left;
          transition: all 0.2s;
        }

        .demo-card:hover {
          border-color: rgba(232,255,71,0.2);
          background: rgba(232,255,71,0.03);
        }

        .card-icon {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .card-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
        }

        .card-value {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-inner">
          {/* Logo */}
          <a className="logo" href="/admin/dashboard">
            <div className="logo-mark">AD</div>
            <span className="logo-text">AdminPanel</span>
            <span className="logo-badge">PRO</span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links">
            {Navlinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="nav-right">
            <button className="notif-btn">
              🔔
              <span className="notif-dot" />
            </button>
            <div className="avatar-btn">JD</div>
            <button
              className={`hamburger ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          {Navlinks.map((link) => (
            <div
              key={link.path}
              className={`mobile-link ${active === link.path ? "active" : ""}`}
              onClick={() => {
                setActive(link.path);
                setIsOpen(false);
              }}
            >
              <span className="mobile-icon">{link.icon}</span>
              {link.name}
            </div>
          ))}
          <div className="mobile-divider" />
          <div className="mobile-link" style={{ color: "var(--danger)" }}>
            ⏻ &nbsp;Sign Out
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;