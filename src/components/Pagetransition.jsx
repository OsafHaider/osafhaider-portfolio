"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Pagetransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {/* The key is the pathname, which changes when the user navigates between pages. When the key
      changes, the component is re-rendered and the animation is triggered. */}
      <div key={pathname}>
        {/* The background overlay that fades in and out when the user navigates between pages. */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
          }}
          className="h-screen w-screen fixed bg-primary pointer-events-none top-0"
        />

        {/* The content of the page. This is the actual page content that is rendered when the user
        navigates to the page. */}
        {children}
      </div>
    </AnimatePresence>
  );
};

export default Pagetransition;
