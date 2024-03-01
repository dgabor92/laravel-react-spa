import { User } from "@/lib/interfaces";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { navigations } from "./Navigations";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { logOut } from "@/lib/api";

interface NewNavBarProps {
  children: React.ReactNode;
  user: User;
}

export default function NewNavBar({ children, user }: NewNavBarProps) {
  const [navBarOpen, setNavBarOpen] = useState<boolean>(false);
  const [navBarPinned, setNavBarPinned] = useState<boolean>(false);

  const navigate = useNavigate();
  const hamburgerMenuClicked = () => {
    const open = !navBarPinned;
    setNavBarPinned(open);
    setNavBarOpen(open);
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={() => {
          if (!navBarPinned) {
            setNavBarOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (!navBarPinned) {
            setNavBarOpen(false);
          }
        }}
        className={`md:bg-stone-700 fixed z-[1000] w-full md:w-16 md:h-full transition-[width] duration-200 ${
          navBarOpen ? "md:!w-96" : null
        }`}
      >
        <div className="bg-stone-700 w-full h-16">
          <Bars3Icon
            className="w-16 h-16 text-white hover:!text-teal-500 transition-colors duration-200 cursor-pointer md:float-right"
            onClick={hamburgerMenuClicked}
          />
        </div>
        <div
          className={` bg-stone-700/70 overflow-hidden transition-[max-height] duration-500 ${
            navBarOpen ? `max-h-[100vh]` : "max-h-0 md:!max-h-[100%]"
          }`}
        >
          {navigations.map((navItem, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate(navItem.href);
                }}
                className={`ml-3 mr-4 p-1 text-center md:!text-left my-3 whitespace-nowrap overflow-hidden rounded-lg transition-colors duration-200 cursor-pointer text-white hover:!text-teal-500 md:hover:bg-stone-500`}
              >
                <div className=" inline-block align-middle text-white">
                  <div className="w-8 h-8 m-auto">{navItem.icon}</div>
                </div>
                <div className="pl-4 inline-block align-middle">
                  {navItem.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed right-1 top-1 z-[1000]">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
              <div className="transition-colors duration-200 h-10 w-10 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center text-lg">
                {user?.name?.substring(0, 2).toUpperCase()}
              </div>
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/admin/settings")}
                      className={`${
                        active ? "bg-stone-700 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Beállítások
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => logOut()}
                      className={`${
                        active ? "bg-stone-700 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Kijelentkezés
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <main
        className={`pt-16 md:pt-0 relative ${
          navBarPinned ? "md:ml-96" : "md:ml-16"
        } transition-[margin] duration-200`}
      >
        {children}
      </main>
    </div>
  );
}
