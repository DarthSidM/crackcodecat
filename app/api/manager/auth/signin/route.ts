import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Manager from "@/models/manager";
import { connect } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRE: string | number = process.env.JWT_EXPIRE || "7d";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { phoneNumber, password } = await req.json();

    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: "Phone number and password are required.", success: false },
        { status: 400 }
      );
    }

    // Find manager and populate role
    const manager = await Manager.findOne({ phoneNumber }).populate("role");
    if (!manager) {
      return NextResponse.json(
        { message: "Manager does not exist. Please sign up first.", success: false },
        { status: 404 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid phone number or password.", success: false },
        { status: 401 }
      );
    }

    // Resolve role safely
    const roleName =
      typeof manager.role === "object" && manager.role && "role" in manager.role
        ? (manager.role as any).role
        : "manager";

    // Generate JWT
    const token = jwt.sign(
      {
        managerId: manager._id.toString(),
        phoneNumber: manager.phoneNumber,
        name: manager.name,
        role: roleName,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    // Prepare cookie
    const cookieValue = JSON.stringify({
      phoneNumber: manager.phoneNumber,
      name: manager.name,
      role: roleName,
    });

    const response = NextResponse.json({
      message: "Login successful!",
      success: true,
      token,
      manager: {
        id: manager._id,
        phoneNumber: manager.phoneNumber,
        name: manager.name,
        role: roleName,
      },
    });

    response.cookies.set("manager", cookieValue, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
