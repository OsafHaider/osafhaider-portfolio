"use client";
import stats from "@/JSON/Statsjson";
import React from "react";
import CountUp from "react-countup";
const Stats = () => {
  return (
    <section className=" pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div  className="grid grid-cols-2 gap-6 max-w-[80vw] mx-auto xl:max-w-none lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              className="flex-1 flex gap-2 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={stat.num}
                duration={5}
                delay={2}
                className="text-3xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  stat.text.length < 15 ? "max-w-[100px] " : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
