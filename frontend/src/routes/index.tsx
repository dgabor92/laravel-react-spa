import { lazy, FC } from "react";
import { useRoutes, RouteObject, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/Settings";
import UsersPage from "@/pages/UsersPage/UsersPage";

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
    path: "/admin/users",
    element: <UsersPage />,
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
