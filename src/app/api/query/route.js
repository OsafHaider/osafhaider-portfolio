import dbConnection from "@/backend/db/db";
import queryModel from "@/backend/model/query";
import userModel from "@/backend/model/user";
import { tokenVerification } from "@/helper/jwt";
import { Types } from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Fetch Queries (GET)
export async function GET() {
  try {
    await dbConnection();
    const queries = await queryModel.find();

    if (!queries || queries.length === 0) {
      return NextResponse.json({
        message: "No queries found",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Queries fetched successfully",
      success: true,
      data: queries,
    });
  } catch (error) {
    console.error("Error from api/query/route.js:", error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

// Add a new Query (POST)
export async function POST(req) {
  try {
    // Retrieve token from cookies
    const token = cookies().get("AccessToken")?.value;

    if (!token) {
      return NextResponse.json({
        message: "Token Not Found",
        success: false,
      });
    }

    // Verify token
    const isVerified = await tokenVerification(token);
    if (!isVerified) {
      return NextResponse.json({
        message: "Invalid Token",
        success: false,
      });
    }

    // Verify user ID
    const { _id } = isVerified;
    const isValidId = Types.ObjectId.isValid(_id);
    if (!isValidId) {
      return NextResponse.json({
        message: "Invalid user id",
        success: false,
      });
    }

    // Fetch user details
    const user = await userModel.findById(_id);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    // Create query data
    const data = await req.json();
    const queryData = {
      ...data,
      requesterName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    // Save query to database
    const query = await queryModel.create(queryData);
    if (!query) {
      return NextResponse.json({
        message: "Query not added",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Query added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error from api/query/route.js:", error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
