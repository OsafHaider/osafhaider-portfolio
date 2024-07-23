import projectModel from "@/backend/model/project";
import dbConnection from "@/backend/db/db";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        message: "Project id is required",
        success: false,
      });
    }
    const verification = await Types.ObjectId.isValid(id);
    if (!verification) {
      return NextResponse.json({
        message: "Invalid project id",
        success: false,
      });
    }
    await dbConnection();
    const singleProject = await projectModel.findById(params.id);
    return NextResponse.json({
      message: "Project fetched successfully",
      success: true,
      data: singleProject,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        message: "Project id is required",
        success: false,
      });
    }
    const verification = await Types.ObjectId.isValid(id);
    if (!verification) {
      return NextResponse.json({
        message: "Invalid project id",
        success: false,
      });
    }
    const body = await req.json();
    await dbConnection();
    const updatedProject = await projectModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "Project updated successfully",
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        message: "Project id is required",
        success: false,
      });
    }
    const verification = await Types.ObjectId.isValid(id);
    if (!verification) {
      return NextResponse.json({
        message: "Invalid project id",
        success: false,
      });
    }
    await dbConnection();
    const deletedProject = await projectModel.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Project deleted successfully",
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
