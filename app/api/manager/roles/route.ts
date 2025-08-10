import { NextRequest, NextResponse } from "next/server";
import Role from "@/models/role";
import { connect } from "@/lib/db";

// CREATE a role
export async function POST(req: NextRequest) {
  try {
    await connect();
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json(
        { message: "Role is required.", success: false },
        { status: 400 }
      );
    }

    const newRole = await Role.create({ role });

    return NextResponse.json(
      { message: "Role created successfully.", success: true, role: newRole },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}

// RETRIEVE all roles
export async function GET() {
  try {
    await connect();
    const roles = await Role.find({});
    return NextResponse.json({ success: true, roles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}

// UPDATE a role
export async function PUT(req: NextRequest) {
  try {
    await connect();
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { message: "Role ID and new role value are required.", success: false },
        { status: 400 }
      );
    }

    const updated = await Role.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Role not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Role updated successfully.", success: true, role: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}

// DELETE a role
export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Role ID is required.", success: false },
        { status: 400 }
      );
    }

    const deleted = await Role.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Role not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Role deleted successfully.", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
