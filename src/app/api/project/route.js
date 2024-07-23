import projectModel from "@/backend/model/project";
import { NextResponse } from "next/server";
import dbConnection from "@/backend/db/db";

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnection();
    const project = await projectModel.create(body);
    if (!project || Object.keys(project).length === 0) {
      return NextResponse.json({
        message: "Project not added",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Project added successfully",
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
    const projects = await projectModel.find();
    if (!projects || Object.keys(projects).length === 0) {
      return NextResponse.json({
        message: "No projects found",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Projects fetched successfully",
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
