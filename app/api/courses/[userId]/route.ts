import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import "@/models/course"; // ensure model is registered
import User from "@/models/user";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // ✅ Await params here
    const { userId } = await context.params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId).populate("coursesRegistered");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      courses: user.coursesRegistered || [],
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
