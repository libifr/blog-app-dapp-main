import { Navigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";

function PublicRoute({ children }) {
  const profile = useProfile();

  if (profile) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PublicRoute;
