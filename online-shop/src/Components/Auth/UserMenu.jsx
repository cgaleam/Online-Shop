import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de usuario"
      >
        <div className="user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || "Usuario"} />
          ) : (
            <span>{getInitials(user?.displayName || user?.email)}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          <div className="user-menu__header">
            <div className="user-avatar user-avatar--large">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "Usuario"} />
              ) : (
                <span>{getInitials(user?.displayName || user?.email)}</span>
              )}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.displayName || "Usuario"}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>

          <div className="user-menu__divider"></div>

          <button className="user-menu__item" onClick={handleLogout}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
