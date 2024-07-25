import React, { useContext } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
// Components
import Nav from "./Nav";
import Mobilenav from "./Mobilenav";
import { UserContext } from "@/context/User";
const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="py-8 xl:py-7 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            Osaf<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* Desktop Nav And Hire Me Button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href={"/contact"}>
            <Button>Hire Me</Button>
          </Link>
          <div
            className={`hidden ${
              user &&
              "w-10 h-10 rounded-full bg-accent flex items-center justify-center"
            }`}
          >
            {user && user.fullName && (
              <p className="font-medium text-2xl">
                {user.fullName.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="xl:hidden">
          <Mobilenav />
        </div>
      </div>
    </header>
  );
};

export default Header;
