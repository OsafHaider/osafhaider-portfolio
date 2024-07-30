"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveDownRight } from "lucide-react";
import { UserContext } from "@/context/User";

const Page = () => {
  const { user } = useContext(UserContext);
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
        >
          {user?.services?.map((service, index) => (
            <div
              className="flex-1 flex flex-col justify-center gap-6 group"
              key={index}
            >
              {/* Top */}
              <div className="w-full flex justify-between items-center">
                <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                  {service.num}
                </div>
                <Link
                  className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex items-center justify-center hover:-rotate-45"
                  href={"/work"}
                >
                  <MoveDownRight className="text-primary text-3xl" />
                </Link>
              </div>
              <h2 className="text-[42px] leading-none font-bold text-white group-hover:text-accent transition-all duration-500">
                {service.value}
              </h2>
              {/* Description */}
              <p className="text-white/60">{service.desc}</p>
              {/* Border */}
              <div className="border-b border-white/20 w-full"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
