import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../lib/userContext";
import Preloader from "./Preloader";

export default function RequireAuth({
  children,
}: {
  children: ReactNode;
}) {
  const ctx = useContext(UserContext);
  const location = useLocation();

  if (!ctx) return null;

  const { auth, token, hydrated } = ctx;

  if (!hydrated) return <Preloader />;

  if (!auth || !token) {
    const url = location.pathname + location.search + location.hash;
    sessionStorage.setItem("redirect", url);
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
