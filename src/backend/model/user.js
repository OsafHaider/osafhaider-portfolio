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
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
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
    experience: [
      {
        time: {
          type: Date,
        },
        position: {
          type: String,
          trim: true,
        },
        company: {
          type: String,
          trim: true,
        },
      },
    ],
    image: {
      type: String,
      trim: true,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = models?.User || model("User", userSchema);
export default userModel;
