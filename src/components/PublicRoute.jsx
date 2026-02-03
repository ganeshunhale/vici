import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectUser } from "../slices/authSlice";

export default function PublicRoute() {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);

  // ✅ user already logged in → redirect based on role
  if (user) {
    return <Navigate to={isAdmin ? "/" : "/call"} replace />;
  }

  // ✅ not logged in → allow access (login page)
  return <Outlet />;
}
