const about = (admin) => {
  return {
    title: "About Me",
    description:
      "A dedicated professional with diverse experience in technology and development, continuously learning and growing.",
    info: [
      {
        fieldName: "Name",
        fieldValue: admin.fullName || "N/A",
      },
      {
        fieldName: "Phone",
        fieldValue: admin.phoneNumber || "N/A",
      },
      {
        fieldName: "Experience",
        fieldValue: admin?.experience?.map((v) => {
          return `${v.totalTime}`;
        }),
      },
      {
        fieldName: "Nationality",
        fieldValue: admin.nationality || "N/A",
      },
      {
        fieldName: "Freelance",
        fieldValue: admin.freelanceStatus ? "Yes" : "No",
      },
      {
        fieldName: "Email",
        fieldValue: admin.email || "N/A",
      },
      {
        fieldName: "Languages",
        fieldValue: admin?.languages?.join(", ") || "N/A",
      },
    ],
  };
};

export default about;
