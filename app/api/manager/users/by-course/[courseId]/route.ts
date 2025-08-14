import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/user";
import { Types } from "mongoose";

const Dummy_Users = [
  { name: "Yash", email: "yash@gmail.com", phone: 66386787287 },
  { name: "Aarav", email: "aarav@example.com", phone: 9876543210 },
  { name: "Priya", email: "priya@example.com", phone: 9123456789 },
  { name: "Karan", email: "karan@example.com", phone: 9988776655 },
  { name: "Neha", email: "neha@example.com", phone: 9876123456 },
  { name: "Rohan", email: "rohan@example.com", phone: 9765432109 },
  { name: "Isha", email: "isha@example.com", phone: 9123987654 },
  { name: "Ankit", email: "ankit@example.com", phone: 9543216780 },
  { name: "Sanya", email: "sanya@example.com", phone: 9098765432 },
  { name: "Vikram", email: "vikram@example.com", phone: 9887654321 },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await connect();

    const { courseId } =await  params;
    console.log("courseid is",courseId);
    
    if (!Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const users = await User.find({
      coursesRegistered: courseId
    }).populate("coursesRegistered");

    

    return NextResponse.json({ success: true, users:Dummy_Users });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
