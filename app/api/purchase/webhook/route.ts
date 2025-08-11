// /api/purchase/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connect } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.text(); // Razorpay sends raw body for signature check
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!) // You set this in Razorpay dashboard
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      // Extract userId and courseId from receipt
      const { courseId, userId } = JSON.parse(event.payload.payment.entity.notes?.receipt || "{}");

      if (!courseId || !userId) {
        return NextResponse.json({ success: false, message: "Missing course/user info" }, { status: 400 });
      }

      await User.findByIdAndUpdate(userId, { $addToSet: { coursesRegistered: courseId } });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Important for raw body
  },
};
