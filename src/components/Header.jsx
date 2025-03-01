import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import Mobilenav from "./Mobilenav";

const Header = () => {
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
            <Button className="text-white">Hire Me</Button>
          </Link>
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
