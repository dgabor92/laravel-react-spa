import Navbar from "./Navbar";
import { useGetUserQuery } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface DashboardProps {
  children: React.ReactNode;
}

function Dashboard({ children }: DashboardProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>("");
  const { data: user, isLoading, isError } = useGetUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    // set currentPage to location.pathname without the first slash with uppercase first letter
    setCurrentPage(
      location.pathname
        .substring(1)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full">
      <Navbar user={user} />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {currentPage}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Dashboard;
