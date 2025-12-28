import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

export function LoginForm({ onSwitchToSignup, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (err.code === "auth/invalid-email") {
        setError("Email inválido");
      } else if (err.code === "auth/invalid-credential") {
        setError("Credenciales inválidas");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToSignup}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
