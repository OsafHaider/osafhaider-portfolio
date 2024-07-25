import userModel from "@/backend/model/user";
import dbConnection from "@/backend/db/db";
import { NextResponse } from "next/server";
import { decrypt } from "secure-encrypt";

export async function GET() {
  try {
    await dbConnection();
    const users = await userModel.find();
    const decryptedPhone = users.map((item) => {
      return decrypt(item.phoneNumber, process.env.SECRET_KEY);
    });
    users.map((user) => {
      user.phoneNumber = decryptedPhone[0];
    });
    if (!users || Object.keys(users).length === 0) {
      return NextResponse.json({
        message: "No users found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
