import { Schema, model, models } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Fullstack", "Mobile", "Other"],
      required: [true, "Category is required"],
    },
    technologies: [
      {
        type: String,
        required: [true, "Technologies are required"],
      },
    ],
    image: {
      type: String, // URL of the project image
      required: [true, "Image URL is required"],
    },
    likes: {
      type: Number,
      default: 0,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    liveUrl: {
      type: String, // URL of the live project
    },
    githubUrl: {
      type: String, // URL of the GitHub repository
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = models?.Project || model("Project", projectSchema);
export default projectModel;
