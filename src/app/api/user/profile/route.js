import dbConnection from "@/backend/db/db";
import userModel from "@/backend/model/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenVerification } from "@/helper/jwt";
import mongoose from "mongoose";
import { decrypt } from "secure-encrypt";

await dbConnection();
export async function GET() {
  try {
    const token = cookies().get("AccessToken")?.value;
    if (!token) {
      return NextResponse.json({
        message: "Token Not Found",
        success: false,
      });
    }

    const isVerified = await tokenVerification(token);
    if (!isVerified) {
      return NextResponse.json({
        message: "Invalid Token",
        success: false,
      });
    }
    const { id } = isVerified;
    if (!id) {
      return NextResponse.json({
        message: "Invalid user id",
        success: false,
      });
    }
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return NextResponse.json({
        message: "Invalid user id",
        success: false,
      });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    const decryptedPhone = decrypt(user.phoneNumber, process.env.SECRET_KEY);
    user.phoneNumber = decryptedPhone;
    return NextResponse.json({
      data: user,
      message: "User fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
