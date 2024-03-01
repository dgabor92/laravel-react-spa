import { FC } from "react";
import Dashboard from "../components/Dashboard";

const PrivateRoute: FC = () => {
  return (
    <Dashboard>
      <div className="">
        <h1 className="text-4xl font-bold">Private Route</h1>
      </div>
    </Dashboard>
  );
};

export default PrivateRoute;
