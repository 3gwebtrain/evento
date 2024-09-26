"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";

const routes = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
];

export const Header: () => JSX.Element = (): JSX.Element => {
  const activePathName = usePathname();
  return (
    <header className="flex items-center border-b border-white/10 justify-between h-14 px-3 md:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="flex h-full gap-x-6 text-sm">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn("hover:text-white flex items-center transition relative", {
                "text-white": activePathName === route.path,
                "text-white/50": activePathName !== route.path,
              })}
            >
              <Link href={route.path}>{route.name}</Link>
              {activePathName === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
