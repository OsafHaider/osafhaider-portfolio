function experience(admin, timeFormatter) {
  const experience = {
    icon: "/badge.svg",
    title: "My Experience",
    description:
      "Explore my journey through various roles and companies where I have honed my skills and contributed to impactful projects. From junior developer positions to more advanced roles, each experience has shaped my professional growth and technical expertise.",
    items: admin?.experience?.map((item) => ({
      company: item.company,
      position: item.position,
      startingTime: timeFormatter(item.startingTime),
      endingTime: timeFormatter(item.endingTime || null), // If endingTime is null, format it as "Present"
    })),
  };

  return experience;
}

export default experience;
