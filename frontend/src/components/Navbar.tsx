import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { logOut } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { navigations as navigation } from "./Navigations";
import { User } from "../lib/interfaces";

const queryClient = new QueryClient();

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface NavbarProps {
  user: User;
  children: React.ReactNode;
}

interface UserMenuProps {
  user: User;
}

function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const logOutMutation = useMutation<void, AxiosResponse<unknown>>(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/admin");
    },
  });

  return (
    <div className="fixed right-0 sm:m-2 mr-2 mt-1 z-50">
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-black/70 text-sm focus:outline-none">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <span className="h-12 w-12 rounded-full text-white flex items-center justify-center">
              {user.name.substring(0, 2).toUpperCase()}
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => navigate("/admin/settings")}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => logOutMutation.mutate()}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default function Navbar({ user, children }: NavbarProps) {
  const navigate = useNavigate();
  console.log(user, "navbar children");
  const [forcedOpenNavBar, setForcedOpenNavBar] = useState(true);
  const [navBarState, setNavBarState] = useState(true);

  useEffect(() => {
    const handleWindowResize = () => {
      if (screen.width < 640) {
        setForcedOpenNavBar(false);
        setNavBarState(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function forceToggleNavBar() {
    setForcedOpenNavBar(!forcedOpenNavBar);
    setNavBarState(!forcedOpenNavBar);
  }

  function closeNavBar() {
    if (!forcedOpenNavBar) {
      setNavBarState(false);
    }
  }

  function openNavBar() {
    setNavBarState(true);
  }

  return (
    <div>
      <UserMenu user={user}></UserMenu>
      <div
        onMouseEnter={openNavBar}
        onMouseLeave={closeNavBar}
        className={` z-10 transition-[width] fixed sm:h-screen sm:w-16 w-screen sm:bg-black ${
          navBarState ? "sm:!w-72 h-16" : ""
        }`}
      >
        <div className="">
          <Bars3Icon
            onClick={forceToggleNavBar}
            className={`block h-12 w-12 text-gray-400 m-1 mb-0 cursor-pointer`}
            aria-hidden="true"
          />
        </div>
        <div
          className={`${navBarState ? "bg-black/70" : "hidden sm:block"} pt-2`}
        >
          {navigation.map((item, index) => (
            <div
              onClick={() => {
                navigation.forEach((dest) => (dest.current = false));
                item.current = true;
                navigate(item.href);
              }}
              key={index}
              className={`whitespace-nowrap hover:bg-gray-700/70 hover:text-white p-2 m-2.5 mt-0 rounded-lg cursor-pointer ${
                item.current ? "bg-gray-700/70 text-white" : "text-gray-400"
              }`}
            >
              {/* <span className={`inline-block align-middle`}>{item.icon}</span> */}
              <span className={`inline-block align-middle`}>{item.icon}</span>
              <span
                className={`inline-block align-middle pl-2 ${
                  navBarState ? null : "hidden"
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`transition-[margin] pt-16 sm:pt-0 ${
          navBarState ? "sm:ml-72" : "sm:ml-16"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
