import dbConnection from "@/backend/db/db";
import userModel from "@/backend/model/user";
import { tokenGenerator } from "@/helper/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compare } from "bcrypt";

// Connect to the Database
dbConnection();

// Starting Endpoint for Login SuperAdmin
export const POST = async (req) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required!",
          success: false,
        },
        { status: 400 }
      );
    }

    const foundByEmail = await userModel.findOne({ email });

    if (!foundByEmail) {
      return NextResponse.json(
        {
          message: "Invalid email address!",
          success: false,
        },
        { status: 404 }
      );
    }

    const passwordCompare = await compare(password, foundByEmail.password);

    if (!passwordCompare) {
      return NextResponse.json(
        {
          message: "Invalid password!",
          success: false,
        },
        { status: 401 }
      );
    }

    const data = {
      id: foundByEmail._id,
      email: foundByEmail.email,
      role: foundByEmail.role,
    };

    // Generate the Token
    const token = await tokenGenerator(data);

    // Handle Expiration Time of Token
    const expirationTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

    // Use cookie method of NextResponse to set cookies
    const response = NextResponse.json(
      {
        message: "You have logged in successfully!",
        success: true,
      },
      { status: 200 }
    );

    cookies().set("AccessToken", token, {
      httpOnly: true,
      path: "/",
      secure: true,
      expires: expirationTime,
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
