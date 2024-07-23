import React from "react";
import Link from "next/link";
import socials from "@/JSON/Socialjson";
const Socials = ({ containerStyle, iconStyle }) => {
  return (
    <div className={containerStyle}>
      {socials.map((icon, index) => (
        <Link className={iconStyle} href={icon.path} key={index}>
          {icon.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
