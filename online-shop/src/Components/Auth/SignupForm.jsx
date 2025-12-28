import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Auth.css";

export function SignupForm({ onSwitchToLogin, onClose }) {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[e.target.name]) {
      setFieldErrors(prev => ({...prev, [e.target.name]: ""}));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    // Validar contraseña
    if (!formData.password) {
      errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      errors.password = "Mínimo 6 caracteres";
    } else if (!/(?=.*[a-zA-Z])/.test(formData.password)) {
      errors.password = "Debe contener al menos una letra";
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Debes confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validaciones del formulario
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Mostrar el primer error en el mensaje general
      const firstError = Object.values(errors)[0];
      setError(firstError);
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
      onClose();
    } catch (err) {
      console.error("Error de Firebase:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("❌ Este email ya está registrado");
        setFieldErrors({email: "Este email ya está en uso"});
      } else if (err.code === "auth/invalid-email") {
        setError("❌ El formato del email no es válido");
        setFieldErrors({email: "Email inválido"});
      } else if (err.code === "auth/weak-password") {
        setError("❌ La contraseña es muy débil, usa al menos 6 caracteres");
        setFieldErrors({password: "Contraseña muy débil"});
      } else if (err.code === "auth/operation-not-allowed") {
        setError("❌ El registro no está habilitado. Contacta al administrador");
      } else {
        setError(`❌ Error: ${err.message || "No se pudo crear la cuenta"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={fieldErrors.name ? "input-error" : ""}
            autoComplete="name"
          />
          {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className={fieldErrors.email ? "input-error" : ""}
            autoComplete="email"
          />
          {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres con letras"
            className={fieldErrors.password ? "input-error" : ""}
            autoComplete="new-password"
          />
          {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            className={fieldErrors.confirmPassword ? "input-error" : ""}
            autoComplete="new-password"
          />
          {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToLogin}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
