import { Types } from "mongoose";
import dbConnection from "@/backend/db/db";
import userModel from "@/backend/model/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenVerification } from "@/helper/jwt";

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
    const { _id } = isVerified;
    const isValidId = Types.ObjectId.isValid(_id);
    if (!isValidId) {
      return NextResponse.json({
        message: "Invalid user id",
        success: false,
      });
    }

    await dbConnection();

    const user = await userModel.findById(_id);
    return NextResponse.json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
