import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course";
import { connect } from "@/lib/db";

// CREATE a course
export async function POST(req: NextRequest) {
  try {
    await connect();
    const { courseName, courseDescription, price , cgst, sgst} = await req.json();

    if (!courseName || !courseDescription || typeof price !== "number" || typeof sgst !== "number" ) {
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    const course = await Course.create({ courseName, courseDescription, price, cgst, sgst });

    return NextResponse.json(
      { message: "Course created successfully.", success: true, course },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}

// RETRIEVE all courses
export async function GET() {
  try {
    await connect();
    const courses = await Course.find({});
    return NextResponse.json({ success: true, courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}


// UPDATE a course
export async function PUT(req: NextRequest) {
  try {
    await connect();
    const { id, courseName, courseDescription, price, cgst, sgst, status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Course ID is required.", success: false },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, any> = { };
    if (typeof courseName !== 'undefined') updatePayload.courseName = courseName;
    if (typeof courseDescription !== 'undefined') updatePayload.courseDescription = courseDescription;
    if (typeof price !== 'undefined') updatePayload.price = price;
    if (typeof cgst !== 'undefined') updatePayload.cgst = cgst;
    if (typeof sgst !== 'undefined') updatePayload.sgst = sgst;
    if (typeof status !== 'undefined') updatePayload.status = status;

    const updated = await Course.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Course not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Course updated successfully.", success: true, course: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}

// DELETE a course
export async function DELETE(req: NextRequest) {
  try {
    await connect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Course ID is required.", success: false },
        { status: 400 }
      );
    }

    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Course not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Course deleted successfully.", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status:500 }
    );
  }
}