import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const navigations = [
  {
    title: "Főoldal",
    href: "/admin/dashboard",
    icon: <HomeIcon strokeWidth={1} />,
  },
  //   {
  //     title: "Étterem",
  //     href: "/admin/etterem",
  //     // icon: <img src="/logo/etterem-logo.svg" />,
  //   },
  //   {
  //     title: "Ifjúsági szálló",
  //     href: "/admin/ifjusagi-szallo",
  //     // icon: <img src="/logo/ifjusagiszallo-logo.png" />,
  //   },
  //   {
  //     title: "Szabadidőközpont",
  //     href: "/admin/szabadidokozpont",
  //     // icon: <img src="/logo/szabadidokozpont-logo.png" />,
  //   },
  //   {
  //     title: "Látogatóközpont",
  //     href: "/admin/latogatokozpont",
  //     // icon: <img src="/logo/latogatokozpont-logo.svg" />,
  //   },
  //   {
  //     title: "Magyar szürkék útja",
  //     href: "/admin/magyar-szurkek-utja",
  //     // icon: <img src="/logo/magyarszurkek-logo.svg" />,
  //   },
  {
    title: "Felhasználók",
    href: "/admin/felhasznalok",
    icon: <UserGroupIcon strokeWidth={1} />,
  },
];
