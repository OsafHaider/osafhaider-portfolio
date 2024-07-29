import dbConnection from "@/backend/db/db";
import userModel from "@/backend/model/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        message: "User id is required",
        success: false,
      });
    }
    const verification = Types.ObjectId.isValid(id);
    if (!verification) {
      return NextResponse.json({
        message: "Invalid user id",
        success: false,
      });
    }
    const body = await req.json();
    await dbConnection();
    const updatedUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
