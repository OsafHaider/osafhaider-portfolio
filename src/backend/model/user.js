import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    DateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    socialMedia: [
      {
        name: {
          type: String,
          trim: true,
        },
        link: {
          type: String,
          trim: true,
        },
      },
    ],
    education: [
      {
        duration: {
          startingTime: {
            type: Date,
          },
          endingTime: {
            type: Date,
          },
        },
        institution: {
          type: String,
          trim: true,
        },
        degree: {
          type: String,
          trim: true,
        },
      },
    ],
    experience: [
      {
        startingTime: {
          type: Date,
        },
        endingTime: {
          type: Date,
          default: null,
        },
        position: {
          type: String,
          trim: true,
        },
        company: {
          type: String,
          trim: true,
        },
        totalTime: {
          type: String,
          trim: true,
        },
      },
    ],
    services: [
      {
        value: {
          type: String,
          trim: true,
        },
        desc: {
          type: String,
          trim: true,
        },
      },
    ],
    freelanceStatus: {
      type: Boolean,
      default: false,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    nationality: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = models?.User || model("User", userSchema);
export default userModel;
