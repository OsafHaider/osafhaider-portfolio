"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserContext } from "@/context/User";

const Photo = () => {
  const { user } = useContext(UserContext);
  // Default image URL
  const defaultImage =
    "https://img.freepik.com/free-vector/colorful-wallpaper-with-geometrical-shapes_23-2148798229.jpg";

  // Image URL from user context or default image
  const imageUrl = user?.image || defaultImage;

  return (
    <div className="w-full h-full relative">
      {/* Image animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
      >
        {/* Image container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten flex items-center justify-center absolute"
        >
          {/* Image */}
          <Image
            className="object-contain w-full h-full border"
            src={"/IMG_20231128_155832_782-removebg-preview.png"}
            priority
            quality={100}
            fill
            alt="User image"
          />
        </motion.div>
        {/* Circle animation */}
        <motion.svg
          className="w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx={253}
            cy={253}
            r={250}
            stroke="#624CAB"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", " 4 250 22 22"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
