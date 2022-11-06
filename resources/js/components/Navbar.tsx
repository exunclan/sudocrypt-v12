import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, usePage } from "@inertiajs/inertia-react";
import { INotification, IPageProps } from "../lib/types";
import NavbarNotifications from "./NavbarNotifications";
import useNavbarLinks from "../lib/use-navbar-links";

interface INavbarProps {
  notifications: INotification[];
}


const Navbar: React.FC<INavbarProps> = ({
  notifications,
}) => {
  const {
    props: {
      authenticated
    },
  } = usePage<IPageProps>();
  const links = useNavbarLinks();
  const currentRoute = window.location.pathname;

  return (
    <div className="w-full flex items-center justify-between flex-wrap mlg:flex-col mlg:justify-center gap-y-4 px-6 my-4">
      <div className="flex items-center gap-x-6">
        <Link href="/">
          <img
            src="/img/logo-red.png"
            alt="Exun 2021-22"
            className="h-12 w-auto"
          />
        </Link>
        <a href="//exunclan.com" target="_blank" rel="noreferrer">
          <img src="/img/exun-logo.png" className="w-auto h-10" />
        </a>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-x-6"
      >
        {links.map(({ href, label }, i) => (
          <Link
            href={href}
            key={i}
            className={`font-light text-gray-400 uppercase tracking-widest ${currentRoute === href ? "!text-white" : ""}`}
          >
            {label}
          </Link>
        ))}

        <NavbarNotifications notifications={notifications} />
      </div>
    </div>
  );
};

export default Navbar;
