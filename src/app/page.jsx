"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
// Components
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
const page = () => {
  return (
    <section className="h-full">
      <div className="mx-auto container">
        <div className="flex flex-col xl:flex-row justify-between items-center xl:pt-3 xl:pb-7">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello Im <br />
              <span className="text-accent">Osaf Haider</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {" "}
              i excel at crafting elegant digital experiences and i am
              proficient in various programming languages and technologies.
            </p>
            {/* Button and Social Links */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href="https://docs.google.com/document/d/18BM2PegNGxMujMlmLIeAucTkHObqtWtqYkrj8P7BNh4/export?format=pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 text-white"
                >
                  <span>Download CV</span>
                  <Download size={18} className="text-xl" />
                </Button>
              </a>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyle="flex gap-6"
                  iconStyle="w-9 h-9 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration:500"
                />
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default page;
