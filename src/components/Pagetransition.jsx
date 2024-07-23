"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
const Pagetransition = ({ children }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
          }}
          className="h-screen w-screen fixed bg-primary pointer-events-none top-0"
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

export default Pagetransition;
