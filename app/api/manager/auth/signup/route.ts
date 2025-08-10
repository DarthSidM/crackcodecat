import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Manager from "@/models/manager";
import Role from "@/models/role";
import { connect } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { phoneNumber, name, password } = await req.json();

    if (!phoneNumber || !name || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if manager already exists
    const existing = await Manager.findOne({ phoneNumber });
    if (existing) {
      return NextResponse.json({ error: "Phone number already registered." }, { status: 409 });
    }

    // Find or create the manager role
    let managerRole = await Role.findOne({ role: "manager" });
    if (!managerRole) {
      managerRole = await Role.create({ role: "manager" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create manager
    const manager = await Manager.create({
      phoneNumber,
      name,
      password: hashedPassword,
      role: managerRole._id
    });

    return NextResponse.json({ message: "Manager signup successful", managerId: manager._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}