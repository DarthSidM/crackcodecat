import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connect } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { phoneNumber, name, password } = await req.json();

    if (!phoneNumber || !name || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if user already exists
    const existing = await User.findOne({ phoneNumber });
    if (existing) {
      return NextResponse.json({ error: "Phone number already registered." }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      phoneNumber,
      name,
      password: hashedPassword,
      coursesRegistered: []
    });

    return NextResponse.json({ message: "Signup successful", userId: user._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}