import Navbar from "./Navbar";
import { getUser } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardProps } from "../lib/interfaces";

function Dashboard({ children }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<string>("");
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!user) {
    navigate("/admin");
  }

  useEffect(() => {
    setCurrentPage(
      location.pathname
        .substring(1)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [location.pathname]);

  return (
    // <div className="min-h-full h-screen bg-white-100 ">
    //   <NewNavBar user={user as User}>{children}</NewNavBar>
    // </div>
    <div className="">
      <Navbar user={user}>
        <div className="relative">
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {currentPage}
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </Navbar>
    </div>
  );
}

export default Dashboard;
