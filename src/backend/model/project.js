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
      enum: ["Frontend", "Backend", "Fullstack"],
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: [true, "Comment text is required"],
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    liveUrl: {
      type: String, // URL of the live project
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = models?.Project || model("Project", projectSchema);
export default projectModel;
