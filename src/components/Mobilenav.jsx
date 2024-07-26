"use client";
import React, { useContext } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import links from "@/JSON/Navjson";
import { UserContext } from "@/context/User";

const Mobilenav = () => {
  // Get user context
  const { user } = useContext(UserContext);
  // Get current pathname
  const pathname = usePathname();

  // Render the Mobilenav component
  return (
    <Sheet>
      {/* Sheet trigger */}
      <SheetTrigger className="flex items-center justify-center">
        {/* Menu icon */}
        <Menu size={32} className="text-[32px] text-accent" />
      </SheetTrigger>
      {/* Sheet content */}
      <SheetContent className="flex flex-col">
        {/* Logo */}
        <div className="mt-32 mb-10 text-center text-2xl">
          {/* Link to homepage */}
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Osaf<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/* Navigation links */}
        {/* nav */}
        <nav className="flex items-center justify-center flex-col gap-8">
          {/* Map over links array */}
          {links.map((link, index) => (
            <Link
              // Set active link style
              className={`${
                link.path === pathname &&
                "text-accent border-b-2 border-accent "
              } capitalize font-medium hover:text-accent transition-all ${
                // Hide login and signup links if user is logged in
                (Object.keys(user) === 0 && link.name === "Login") ||
                link.name === "Signup"
                  ? "hidden"
                  : null
              }`}
              href={link.path}
              key={index}
            >
              {/* Link name */}
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Mobilenav;
