import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { useGetUserQuery } from "../lib/api";

const PrivateRoute: FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    navigate("/login");
    return null;
  }

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
