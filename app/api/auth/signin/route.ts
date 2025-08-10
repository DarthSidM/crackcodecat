import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connect } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d"; // e.g. "7d" or "1h"

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

        // Find user by phone number
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exist. Please sign up first.", success: false },
                { status: 404 }
            );
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid phone number or password.", success: false },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                phoneNumber: user.phoneNumber,
                name: user.name,
            } as { userId: string; phoneNumber: string; name: string },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE } as jwt.SignOptions
        );

        // Set cookie with phoneNumber and name (as a JSON string)
        const cookieValue = JSON.stringify({
            phoneNumber: user.phoneNumber,
            name: user.name,
        });

        const response = NextResponse.json({
            message: "Login successful!",
            success: true,
            token,
            user: {
                id: user._id,
                phoneNumber: user.phoneNumber,
                name: user.name,
            },
        });

        response.cookies.set("user", cookieValue, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60, // 7 days
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