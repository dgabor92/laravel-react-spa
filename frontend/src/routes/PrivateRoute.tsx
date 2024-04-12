import { FC } from "react";
import Dashboard from "../components/Dashboard";

const PrivateRoute: FC = () => {
  return (
    <Dashboard>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {/* <div className="px-4 py-6 sm:px-0"> */}
        {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div> */}
        {/* </div> */}
      </div>
    </Dashboard>
  );
};

export default PrivateRoute;
