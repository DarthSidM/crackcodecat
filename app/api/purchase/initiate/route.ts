// /api/purchase/initiate/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connect } from "@/lib/db";
import Course from "@/models/course";

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { courseId, userId } = await req.json();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
    }

    const amount = course.price * 100;

    const order = await instance.orders.create({
      amount,
      currency: "INR",
      receipt: JSON.stringify({ courseId, userId }), // store both in receipt for later
      payment_capture: 1,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
