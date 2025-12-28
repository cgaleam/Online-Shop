import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import "./Auth.css";

export function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const [view, setView] = useState(initialView);

  // Sincronizar vista cuando cambia initialView
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>
        
        {view === "login" ? (
          <LoginForm
            onSwitchToSignup={() => setView("signup")}
            onClose={onClose}
          />
        ) : (
          <SignupForm
            onSwitchToLogin={() => setView("login")}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
