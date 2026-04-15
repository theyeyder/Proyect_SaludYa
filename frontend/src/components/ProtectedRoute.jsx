import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(usuario.nivelAcceso)) {
    return <Navigate to="/" replace />;
  }

  return children;
}