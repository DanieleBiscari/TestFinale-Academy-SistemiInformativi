import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MeteoPage from "../pages/MeteoPage";
import UserProfilePage from "../pages/UserProfilePage";
import { NotLoggedRoutes } from "./NotLoggedRoutes";
import { LoggedRoutes } from "./LoggedRoutes";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        children: [
          {
            path: "",
            element: (
              <LoggedRoutes>
                <HomePage />
              </LoggedRoutes>
            ),
          },
          {
            path: "login",
            element: (
              <NotLoggedRoutes>
                <LoginPage />
              </NotLoggedRoutes>
            ),
          },
          {
            path: "register",
            element: (
              <NotLoggedRoutes>
                <RegisterPage />
              </NotLoggedRoutes>
            ),
          },
          {
            path: "meteo",
            children: [
              {
                path: "",
                element: (
                  <LoggedRoutes>
                    <MeteoPage />
                  </LoggedRoutes>
                ),
              },
            ],
          },
          {
            path: "user",
            children: [
              {
                path: "",
                element: (
                  <LoggedRoutes>
                    <UserProfilePage />
                  </LoggedRoutes>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 not found</h1>,
  },
]);
