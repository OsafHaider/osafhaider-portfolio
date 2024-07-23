"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/JSON/Navjson";
const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          className={`${
            link.path === pathname && "text-accent border-b-2 border-accent "
          } capitalize font-medium hover:text-accent transition-all`}
          href={link.path}
          key={index}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
