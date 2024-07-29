"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Worksliderbtn from "@/components/Worksliderbtn";

const Page = () => {
  const [data, setData] = useState([]);
  const [project, setProject] = useState(null); // Initialize with null or an empty object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("/api/project", {
          headers: {
            Authorization:
              "njcieciweicwu261676671xnkxjjnqxexiqn1903743147991341418471nmjmlek",
          },
        });
        const response = await request.json();
        if (response.success) {
          setData(response.data);
          if (response.data.length > 0) {
            setProject(response.data[0]); // Set the first project as default
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error.message);
      }
    };

    fetchData();
  }, []); // Fetch data only once on component mount

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(data[currentIndex] || null); // Update the project based on the current slide
  };

  return (
    <motion.section
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {project && (
                <>
                  <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                    {project.num}
                  </div>
                  <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                    {project.category}
                  </h2>
                  <p className="text-white/60">{project.description}</p>
                  <ul className="flex gap-4">
                    {project.technologies?.map((item, index) => (
                      <li className="text-xl text-accent" key={index}>
                        {item}
                        {index !== project.technologies?.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                  <div className="border border-white/20"></div>
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <Link href={project.liveUrl}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                              <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Live Projects</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="mb-12 xl:h-[520px]"
            >
              {data.map((pro, index) => (
                <SwiperSlide className="w-full" key={index}>
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                    <div className="relative w-full h-full">
                      <Image
                        className="object-cover"
                        src={pro.image}
                        fill
                        alt={pro.title}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <Worksliderbtn
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary w-[44px] h-[44px] flex items-center justify-center text-[22px] transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Page;
