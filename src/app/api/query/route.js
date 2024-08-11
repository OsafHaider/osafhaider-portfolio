import dbConnection from "@/backend/db/db";
import queryModel from "@/backend/model/query";
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
    // Create query data
    const data = await req.json();

    // Save query to database
    const query = await queryModel.create(data);
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
