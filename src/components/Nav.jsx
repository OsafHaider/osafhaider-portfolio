"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/JSON/Navjson";
import { UserContext } from "@/context/User";

const Nav = () => {
  // Get user context
  const { user } = useContext(UserContext);

  // Get current pathname
  const pathname = usePathname();

  // Render the navigation component
  return (
    <nav className="flex gap-8">
      {/* Map over links array */}
      {links.map((link, index) => {
        // Determine if the link is active
        const isActive = link.path === pathname;

        // Determine if the link should be hidden
        const isHidden =
          Object.keys(user).length !== 0 &&
          (link.name === "Login" || link.name === "Signup");

        return (
          <Link
            // Set active link style
            className={`
              ${isActive ? "text-accent border-b-2 border-accent " : ""}
              capitalize font-medium hover:text-accent transition-all
              ${isHidden ? "hidden" : ""}
            `}
            href={link.path}
            key={index}
          >
            {/* Link name */}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
