import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// EndPoint for Remove The Cookie/Logout the superAdmin
export async function DELETE() {
  try {
    const cookie = cookies();
    cookie.delete("AccessToken");
    return NextResponse.json({
      message: "LoggedOut!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
