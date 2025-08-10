import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/user";

export async function GET() {
  try {
    await connect();

    const users = await User.find({
      coursesRegistered: { $exists: true, $ne: [] }
    }).populate("coursesRegistered");

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
