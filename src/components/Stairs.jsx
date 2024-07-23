import React from "react";
import { animate, motion } from "framer-motion";

const stairAnimation = {
  initail: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

// Calculate The Reserved Index For Staggered Delay
const reservedIndex = (index) => {
  const totalSteps = 6; // Total Number Of Steps
  return totalSteps - index - 1;
};
const Stairs = () => {
  return (
    <>
      {/* Render 6 Motion Divs,Each Respresenting a Set Of Stairs.
    Each Div Will Have The Same Animation Defined By The StairAnimation Object.
    The Delay For Each Div is Calculated Automatically Based On Its Reserved Index.
    Creating a Staggered Effect with Decreasing For Each Subsequent Step.
    */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initail"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reservedIndex(index) * 0.1,
          }}
          className="w-full h-full bg-white relative"
        />
      ))}
    </>
  );
};

export default Stairs;
