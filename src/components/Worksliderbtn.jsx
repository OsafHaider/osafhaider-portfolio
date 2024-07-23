"use client";
import React from "react";
import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
const Worksliderbtn = ({ containerStyles, btnStyles }) => {
  const swiper = useSwiper();
  return (
    <div className={containerStyles}>
      <button
        onClick={() => {
          swiper.slidePrev();
        }}
        className={btnStyles}
      >
        <PiCaretLeftBold  />
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className={btnStyles}
      >
        <PiCaretRightBold  />
      </button>
    </div>
  );
};

export default Worksliderbtn;
