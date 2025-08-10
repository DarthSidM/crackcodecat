import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/user";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await connect();

    const { courseId } = params;
    if (!Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const users = await User.find({
      coursesRegistered: courseId
    }).populate("coursesRegistered");

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
