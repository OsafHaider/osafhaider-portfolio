import userModel from "@/backend/model/user";
import dbConnection from "@/backend/db/db";
import { NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt";
import { encrypt } from "secure-encrypt";
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