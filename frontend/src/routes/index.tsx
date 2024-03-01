import { lazy, FC } from "react";
import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings";

const NotFound = lazy(() => import("../pages/404"));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/admin"} />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoute />,
  },
  {
    path: "/admin/settings",
    element: <Settings />,
  },
  {
    path: "/admin/*",
    element: <NotFound />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
