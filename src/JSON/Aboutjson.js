const about = (user, timeFormatter) => {
  return {
    title: "About Me",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cupiditate ea quod quis, a laborum odio aliquam?",
    info: [
      {
        fieldName: "Name",
        fieldValue: user.fullName || "N/A",
      },
      {
        fieldName: "Phone",
        fieldValue: user.phoneNumber || "N/A",
      },
      {
        fieldName: "Experience",
        fieldValue: user?.experience?.map((v) => {
          return `${v.totalTime}`;
        }),
      },
      {
        fieldName: "Nationality",
        fieldValue: user.nationality || "N/A",
      },
      {
        fieldName: "Freelance",
        fieldValue: user.freelanceStatus ? "Yes" : "No",
      },
      {
        fieldName: "Email",
        fieldValue: user.email || "N/A",
      },
      {
        fieldName: "Languages",
        fieldValue: user?.languages?.join(", ") || "N/A",
      },
    ],
  };
};

export default about;
