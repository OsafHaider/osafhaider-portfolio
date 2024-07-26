import React from "react";
import Link from "next/link";
import socials from "@/JSON/Socialjson";

const Socials = ({ containerStyle, iconStyle }) => {
  // Render a container of social media icons.
  return (
    <div className={containerStyle}>
      {/* Map over the social media icons and render each one. */}
      {socials.map((icon, index) => (
        <Link className={iconStyle} href={icon.path} key={index}>
          {/* Render the icon. */}
          {icon.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
