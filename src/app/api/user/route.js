import userModel from "@/backend/model/user";
import dbConnection from "@/backend/db/db";
import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { encrypt, decrypt } from "secure-encrypt";
export async function POST(req) {
  try {
    const body = await req.json();
    const { password, phoneNumber } = body;
    const saltRound = await genSalt(Number(process.env.SALT_ROUND));
    const encryptedPassword = await hash(password, saltRound);
    const encryptedPhone = encrypt(phoneNumber, process.env.SECRET_KEY);
    body.password = encryptedPassword;
    body.phoneNumber = encryptedPhone;
    await dbConnection();
    const user = await userModel.create(body);
    if (!user || Object.keys(user).length === 0) {
      return NextResponse.json({
        message: "User not added",
        success: false,
      });
    }
    return NextResponse.json({
      message: "User added successfully",
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
