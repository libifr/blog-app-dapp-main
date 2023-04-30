import { Navigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

function ProtectedRoute({ role, children }) {
  const profile = useProfile();

  if (!profile) {
    return <Navigate to="/login" replace />;
  } else {
    if (role && !role.includes(profile.role)) {
      return <Navigate to="/404" replace />;
    }
  }
  return children;
}

export default ProtectedRoute;
