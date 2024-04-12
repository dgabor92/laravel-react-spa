import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const navigations = [
  {
    title: "Főoldal",
    href: "/admin/dashboard",
    icon: <HomeIcon strokeWidth={1} width={30} height={30} />,
    current: true,
  },
  {
    title: "Felhasználók",
    href: "/admin/users",
    icon: <UserGroupIcon strokeWidth={1} width={30} height={30} />,
    current: false,
  },
];
