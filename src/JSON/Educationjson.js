function education(user, timeFormatter) {
  const education = {
    icon: "/cap.svg",
    title: "My Education",
    description:
      "Explore my educational background and academic achievements. From foundational degrees to specialized certifications, each milestone has contributed to my skill set and professional development.",
    items: user?.education?.map((item) => ({
      institution: item.institution,
      degree: item.degree,
      duration: `${timeFormatter(item.duration.startingTime)} - ${timeFormatter(
        item.duration.endingTime || null
      )}`,
    })),
  };

  return education;
}

export default education;
