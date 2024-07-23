import dbConnection from "@/backend/db/db";
import queryModel from "@/backend/model/query";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const isVerified = Types.ObjectId.isValid(id);
    if (!isVerified) {
      return NextResponse.json({
        message: "Invalid query id",
        success: false,
      });
    }
    const data = await req.json();
    await dbConnection();
    const query = await queryModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!query) {
      return NextResponse.json({
        message: "Query not found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Query updated successfully",
      success: true,
      data: query,
    });
  } catch (error) {
    console.log(error.message, "From api/query/status/[id]/route.js");
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
