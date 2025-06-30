import { Navigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ReactNode } from "react";

// Extendemos JwtPayload para incluir el campo `role`
interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const sessionData = sessionStorage.getItem("token");

  if (!sessionData) {
    return <Navigate to="/" replace />;
  }

  try {

    const token = sessionData;
    const decoded = jwtDecode<CustomJwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    if (!decoded.exp || decoded.exp < now) {
      sessionStorage.clear();
      return <Navigate to="/" replace />;
    }
    
    if (allowedRoles.length > 0 && (!decoded.role || !allowedRoles.includes(decoded.role))) {
      console.warn(`Rol no autorizado: ${decoded.role}`);
      return <Navigate to="/" replace />;
    }
    return children;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    sessionStorage.clear();
    return <Navigate to="/" replace />;
  }
}