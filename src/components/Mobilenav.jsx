"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import links from "@/JSON/Navjson";
const Mobilenav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <Menu size={32} className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* Logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Osaf<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex items-center justify-center flex-col gap-8">
          {links.map((link, index) => (
            <Link
              className={`${
                link.path === pathname &&
                "text-accent border-b-2 border-accent "
              } capitalize font-medium text-xl hover:text-accent transition-all`}
              href={link.path}
              key={index}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Mobilenav;
