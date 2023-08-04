import { lazy, FC } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import Welcome from "../pages/Welcome";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings";

const NotFound = lazy(() => import("../pages/404"));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
