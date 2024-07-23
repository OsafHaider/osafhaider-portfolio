import { Schema, model, models } from "mongoose";

const querySchema = new Schema(
  {
    requesterName: {
      type: String,
      required: [true, "Requester name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    querySubject: {
      type: String,
      required: [true, "Query subject is required"],
      trim: true,
    },
    queryDescription: {
      type: String,
      required: [true, "Query description is required"],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
      enum: ["Frontend", "Backend", "Fullstack"],
    },
    techStack: {
      type: String,
      required: [true, "Tech stack is required"],
      trim: true,
      enum: ["Next.js", "MERN Stack"],
    },
    status: {
      type: String,
      trim: true,
      default: "recently",
      enum: ["recently", "pending", "completed"],
    },
  },
  {
    timestamps: true,
  }
);

const queryModel = models?.Query || model("Query", querySchema);
export default queryModel;
