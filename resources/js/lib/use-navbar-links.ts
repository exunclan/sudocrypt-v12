import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "./types";

export default function useNavbarLinks() {
  const {
    props: {
      auth: {
        user: { admin },
      },
      authenticated,
    },
  } = usePage<IPageProps>();

  const links: { href: string; label: string }[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
  ]
    .concat(
      authenticated
        ? [
            {
              href: "/leaderboard",
              label: "Leaderboard",
            },
            // {
            //   href: "/me",
            //   label: "Profile",
            // },
            {
              href: "/auth/logout",
              label: "Logout",
            },
          ]
        : [
            {
              href: "/auth/register",
              label: "Register",
            },
            {
              href: "/auth/login",
              label: "Login",
            },
          ]
    )
    .concat(admin ? [{ href: "/admin", label: "Admin" }] : []);

  return links;
}
