const QueryForm = [
  {
    inputname: "fullName",
    label: "Name",
    placeholder: "Enter your name",
    stype: "text",
  },
  {
    inputname: "email",
    label: "Email",
    placeholder: "Enter your email",
    stype: "email",
  },
  {
    inputname: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    stype: "tel",
  },
  {
    inputname: "projectType",
    label: "Project Type",
    placeholder: "Select project type",
    type: "select",
    options: ["Frontend", "Backend", "Fullstack"],
  },
  {
    inputname: "techStack",
    label: "Tech Stack",
    placeholder: "Select tech stack",
    type: "select",
    options: ["Next.js", "MERN Stack"],
  },
  {
    inputname: "querySubject",
    label: "Query Subject",
    placeholder: "Enter the subject of your query",
    stype: "text",
  },
  {
    inputname: "queryDescription",
    label: "Query Description",
    placeholder: "Describe your query",
    stype: "textarea",
  },
];
export default QueryForm;
