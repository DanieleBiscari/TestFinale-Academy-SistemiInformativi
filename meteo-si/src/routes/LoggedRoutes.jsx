import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByCookie } from "../utils/findUserByCookie";

export function LoggedRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = findUserByCookie();
    if (!user?.logged) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}
