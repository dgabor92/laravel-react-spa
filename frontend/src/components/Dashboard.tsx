import { getUser } from "../lib/api";
import { DashboardProps } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/interfaces";
import NewNavBar from "./NewNavBar";

function Dashboard({ children }: DashboardProps) {
  const [_, setCurrentPage] = useState<string>("");

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
    <div className="min-h-full h-screen bg-white-100 ">
      <NewNavBar user={user as User}>{children}</NewNavBar>
    </div>
  );
}

export default Dashboard;
