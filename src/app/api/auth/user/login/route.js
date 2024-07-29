import dbConnection from "@/backend/db/db";
import userModel from "@/backend/model/user";
import { tokenGenerator } from "@/helper/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compare } from "bcrypt";

// Connect The DataBase
dbConnection();
// Starting EndPoint For Login SuperAdmin
export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    const foundByemail = await userModel.findOne({ email });
    if (Object.keys(foundByemail).length === 0 || !foundByemail) {
      return NextResponse.json({
        message: "Email is invalid!!",
        success: false,
      });
    }
    const passwordCompare = await compare(password, foundByemail.password);
    if (!passwordCompare) {
      return NextResponse.json({
        message: "Password is invalid",
        success: false,
      });
    }
    const data = {
      id: foundByemail._id,
      email: foundByemail.email,
      role: foundByemail.role,
    };
    // Generate The Token
    const token = await tokenGenerator(data);
    // Handle Expiration Time Of Token
    // Calculate the expiration time for 5 days
    const expirationTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    // Use cookie function of Nextjs App Router
    const cookie = cookies();
    cookie.set("AccessToken", token, {
      httpOnly: true,
      path: "/",
      secure: true,
      expires: expirationTime,
    });
    return NextResponse.json(
      {
        message: "You LoggedIn!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
